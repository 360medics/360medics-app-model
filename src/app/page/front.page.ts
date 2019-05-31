import {Component, Renderer2, ElementRef, Input} from '@angular/core';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {AppEntry, SearchBarData, Data} from '../interface';
import { ReadJsonFileService } from '../services';
import { Broadcaster } from '../services/broadcaster.service';
import { IframeGeneratorService } from '../services/iframe.generator.service';

@Component({
    selector: 'app-front-page',
    templateUrl: './front.page.html',
    styleUrls: ['./front.page.scss']
})

export class FrontPageComponent implements OnInit {

    data: AppEntry[] = [];
    appsList: AppEntry[] = [];
    @Input() jsonData: Data;
    @Input() searchResults: SearchBarData;

    openIn: boolean;
    iframeUrl: string;

    constructor (private title: Title, private reader: ReadJsonFileService, private _broadcaster: Broadcaster, private _r2: Renderer2, private _elem: ElementRef, private _iframeGenerator: IframeGeneratorService) {

    }

    ngOnInit() {
        this._broadcaster.on('filter.on.apps.category', (data) => {
            this.filterScoreListOnCategory(data.category);
        });

        this._broadcaster.on('open.app.in.iframe', (data) => {
            this.openIn = true;
            this._iframeGenerator.setUrl(data.url).setRenderer2(this._r2).createWithRenderer2();
        });

        this._broadcaster.on('close.app.iframe', (data) => {
            this.openIn = false;
            this.appsList = this.data;
            document.querySelector('iframe').remove();
        });

        this.getAppsList();
    }

    getAppsList() {
        this.data = this.jsonData.appEntries;
        this.appsList = this.data;
        this.sortApps();
    }

    filterAppsList(e: any) {
        if (e.needle !== null && e.needle.length > 0) {
            this.appsList = this.data
                .filter((app: AppEntry) => this.match(app, e.needle))
        } else {
            this.appsList = this.data;
        }
    }

    filterScoreListOnCategory(category: string) {
        if (null === category) {
            this.appsList = this.data;
        } else {
            this.appsList = this.data.filter((app: AppEntry) => {
                if (app.appCategory !== undefined && null !== app.appCategory) {
                    return app.appCategory.indexOf(category.toLowerCase()) > -1;
                }
                return false;
            });
        }
    }

    private match(app: AppEntry, term: string) {
        const subtitle = app.appSubtitle.toLocaleLowerCase();
        const title = app.appTitle.toLocaleLowerCase();
        term = term.toLocaleLowerCase();

        if (subtitle.includes(term) || title.includes(term)) {
            return true;
        }

        return false;
    }

    private sortApps() {
        this.appsList = this.appsList.sort((a, b) => a.appTitle.toLocaleLowerCase().localeCompare(b.appTitle.toLocaleLowerCase()));
    }
}
