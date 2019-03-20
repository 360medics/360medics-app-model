import { Component, Renderer2, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


import { Score, ScoreInterface } from '../interface';

// Declare custom service here
import { ReadJsonFileService } from '../services';
import { Broadcaster } from '../services/broadcaster.service';
import { IframeGeneratorService } from '../services/iframe.generator.service';

@Component({
    selector: 'app-front-page',
    templateUrl: './front.page.html',
    styleUrls: ['./front.page.scss']
})

export class FrontPageComponent implements OnInit {

    data: Array<ScoreInterface> = [];
    searchResults: Array<ScoreInterface> = [];
    scoresList: Array<ScoreInterface> = [];

    openViewer: boolean;
    iframeUrl: string;

    constructor(private title: Title,
        private reader: ReadJsonFileService,
        private _broadcaster: Broadcaster,
        private _r2: Renderer2,
        private _elem: ElementRef,
        private _iframeGenerator: IframeGeneratorService
    ) {
        this.title.setTitle('Rhumato Scores');
        this.openViewer = false;

        this.getScoresList();
    }

    ngOnInit() {
        this._broadcaster.on('filter.on.scores.category', (data) => {
            this.filterScoreListOnCategory(data.category);
        });

        this._broadcaster.on('open.score.in.iframe', (data) => {
            this.openViewer = true;
            this._iframeGenerator.setUrl(data.url).setRenderer2(this._r2).createWithRenderer2();
        });

        this._broadcaster.on('close.score.iframe', (data) => {
            this.openViewer = false;
            this.scoresList = this.data;
            document.querySelector('iframe').remove();
        });
    }

    /**
     * flat score list 
     * affect correct pathology to each score entry
     */
    getScoresList() {
        this.reader.getJsonData('assets/data.json')
            .then((res) => {
                res.map((s: Score) => {
                    s.scores.map((si: ScoreInterface) => {
                        si.pathology = s.pathology;
                        this.data.push(si);
                    });
                });
                this.sortScores();
            });
        this.scoresList = this.data;
    }

    filterScoresListe(e: any) {
        if (e.needle !== null && e.needle.length > 0) {
            this.scoresList = this.data
                .filter((score: ScoreInterface) => this.match(score, e.needle))
        }
    }

    filterScoreListOnCategory(category: string) {
        if (null === category) {
            this.scoresList = this.data;
        } else {

            this.scoresList = this.data.filter((score: ScoreInterface) => {
                if (score.category !== undefined) {
                    return score.category.toLocaleLowerCase().includes(category.toLocaleLowerCase())
                }

                return false;
            });
        }
    }

    private match(score: ScoreInterface, term: string) {
        const pathology = score.pathology.toLocaleLowerCase();
        const title = score.title.toLocaleLowerCase();
        term = term.toLocaleLowerCase();

        if (pathology.includes(term) || title.includes(term)) {
            return true;
        }

        return false;
    }

    private sortScores() {
        this.scoresList.sort((a, b) => a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase()));
    }
}
