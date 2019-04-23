import { Component, Input, OnInit } from '@angular/core';
import { Broadcaster } from '../../services/broadcaster.service';
import { ReadJsonFileService } from '../../services';
import { Data } from '../../interface/model.interface';

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss']
})

export class FooterComponent implements OnInit {
    @Input() data: Data;
    hide: boolean;
    activated: string;
    footerItems: Array<any> = [];

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

        this.footerItems = this.data.appData.footerData;
    }

    filter(category: string) {
        this._broadcaster.emit('click.category', category);
        this.activated = category;
    }
}
