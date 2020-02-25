import { Component, Input, OnInit } from '@angular/core';
import { Broadcaster } from '../../services/broadcaster.service';
import { ReadJsonFileService } from '../../services';
import { Data } from '../../interface';

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss']
})

export class FooterComponent implements OnInit {
    @Input() data: Data;
    hide: boolean;
    activated: string;
    footerItems: any;
    appColor: string;

    constructor(private _broadcaster: Broadcaster, private _jsonDataReader: ReadJsonFileService) {
        this.hide = false;
        this.activated = 'all';
    }

    ngOnInit() {
        this._broadcaster.on('open.app.in.iframe', (data) => {
            this.hide = true;
        });

        this._broadcaster.on('close.app.iframe', (data) => {
            this.hide = false;
        });

        if (typeof  this.data.appData.footerData !== 'undefined') {
            this.activated = this.data.appData.footerData[0].footerCategory;
            this.footerItems = this.data.appData.footerData;
            this.appColor = this.data.appData.appColor;
        } else {
            this.hide = true;
        }

    }

    filter(category: string) {
        this._broadcaster.emit('click.category', category);
        this.activated = category;
    }
}
