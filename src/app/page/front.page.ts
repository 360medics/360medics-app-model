import {Component, Renderer2, ElementRef, Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {AppEntry, SearchBarData, Data} from '../interface';
import {ReadJsonFileService} from '../services';
import {Broadcaster} from '../services/broadcaster.service';
import {IframeGeneratorService} from '../services/iframe.generator.service';

@Component({
    selector: 'app-front-page',
    templateUrl: './front.page.html',
    styleUrls: ['./front.page.scss']
})

export class FrontPageComponent implements OnInit {

    data: AppEntry[] = [];
    appsList: AppEntry[] = [];
    appsListParent: Array<AppEntry[]> = new Array<AppEntry[]>();
    allDocs: AppEntry[] = [];
    appListBeforeFilter: AppEntry[] = [];
    @Input() jsonData: Data;
    @Input() searchResults: SearchBarData;
    activatedCategory: string;
    openIn: boolean;

    constructor(private title: Title, private reader: ReadJsonFileService, private _broadcaster: Broadcaster, private _r2: Renderer2, private _elem: ElementRef, private _iframeGenerator: IframeGeneratorService) {
    }

    ngOnInit() {
        if (typeof this.jsonData.appData.footerData !== 'undefined') {
            this.activatedCategory = this.jsonData.appData.footerData[0].footerCategory;
        } else {
            this.activatedCategory = 'Tout';
        }
        this._broadcaster.on('filter.on.apps.category', (data) => {
            this.filterScoreListOnCategory(data.category);
        });

        this._broadcaster.on('open.app.in.iframe', (data) => {
            this.openIn = true;
            this.appsListParent.push(this.appsList);
            this._iframeGenerator.setUrl(data.url).setRenderer2(this._r2).createWithRenderer2();
        });

        this._broadcaster.on('close.app.iframe', (data) => {
            this.openIn = false;
            this.appsList = this.appsListParent.pop();
            document.querySelector('iframe').remove();
        });

        this._broadcaster.on('click.category', (event) => {
            this.activatedCategory = event;
        });

        this._broadcaster.on('open.list', (data) => {
            this.openIn = false;
            this.appsListParent.push(this.appsList);
            this.appsList = data.appEntries;
        });

        this._broadcaster.on('go.back', (data) => {
            this.appsList = this.appsListParent.pop();
            this.appListBeforeFilter = [];
            this.allDocs = [];
        });
        this.getAppsList();
    }

    getAppsList() {
        this.data = this.jsonData.appEntries;
        this.appsList = this.data;
    }

    filterAppsList(e: any) {
        if (e.needle !== null && e.needle.length > 0) {
            if (this.allDocs.length === 0 && this.appListBeforeFilter.length === 0) {
                this.findAllDocs(this.appsList, this.allDocs);
                this.appListBeforeFilter = this.appsList;
            }
            this.appsList = this.allDocs
                .filter((app: AppEntry) => this.match(app, e.needle));
        } else {
            if (this.appListBeforeFilter.length !== 0 && this.allDocs.length !== 0) {
                this.appsList = this.appListBeforeFilter;
                this.appListBeforeFilter = [];
                this.allDocs = [];
            }
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

    findAllDocs(entry: Array<AppEntry>, exit: Array<AppEntry>) {
        entry.forEach((app: AppEntry) => {
            if (app.appEntries === undefined || app.appEntries.length === 0) {
                exit.push(app);
            } else {
                this.findAllDocs(app.appEntries, exit);
            }
        });
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
