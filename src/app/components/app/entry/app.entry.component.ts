import { Component, OnInit, Input } from '@angular/core';
import {AppEntry, Data} from '../../../interface';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Broadcaster } from '../../../services/broadcaster.service';
import {ReadJsonFileService} from '../../../services';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-entry',
    templateUrl: 'app.entry.component.html',
    styleUrls: ['app.entry.component.scss']
})

export class AppEntryComponent implements OnInit {
    @Input() app: AppEntry;
    @Input() lastEntry: boolean;
    appColor: string;

    currentCategory: string;
    appLink: string;

    constructor(private _broadcaster: Broadcaster, private _deviceDetectorService: DeviceDetectorService, private _jsonDataReader: ReadJsonFileService) {
        this.currentCategory = "Tout";
    }

    ngOnInit() {
        if (this.app.isExternalLink) {
            this.appLink = this.app.appLink;
        } else {
            this.appLink = environment.toolPath + this.app.appLink;
        }
        this._broadcaster.on('click.category', (event) => {
            this.currentCategory = event;
        });
    }

    open() {
        let finalLink = this.appLink;
        let target = "_blank";

        if (!this._deviceDetectorService.isDesktop()) {
            finalLink = 'medics://viewer?m_source=' + this.appLink;
            target = '_self';
        }
        !this.app.isExternalLink ? this.openAppInIframe() : window.open(finalLink, target);
    }

    openAppInIframe() {
        this._broadcaster.emit('open.app.in.iframe', { url: this.appLink, title: this.app.appTitle });
    }
}