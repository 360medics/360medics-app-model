import { Component, OnInit, Input } from '@angular/core';
import {AppEntry} from '../../../interface';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Broadcaster } from '../../../services/broadcaster.service';
import {ReadJsonFileService} from '../../../services';

@Component({
    selector: 'app-entry',
    templateUrl: 'app.entry.component.html',
    styleUrls: ['app.entry.component.scss']
})

export class AppEntryComponent implements OnInit {
    @Input() app: AppEntry;
    @Input() lastEntry: boolean;

    currentCategory: string;

    constructor(private _broadcaster: Broadcaster, private _deviceDetectorService: DeviceDetectorService, private _jsonDataReader: ReadJsonFileService) {
        this.currentCategory = null;
    }

    ngOnInit() {
        this._broadcaster.on('click.category', (event) => {
            this.currentCategory = event;
        });
    }

    open() {
        let finalLink = this.app.appLink;
        let target = "_blank";

        if (!this._deviceDetectorService.isDesktop()) {
            finalLink = 'medics://viewer?m_source=' + this.app.appLink;
            target = '_self';
        }

        this.app.appOpenIn ? this.openAppInIframe() : window.open(finalLink, target);
    }

    openAppInIframe() {
        this._broadcaster.emit('open.app.in.iframe', { url: this.app.appLink, title: this.app.appTitle });
    }

    contactUs() {
        const recipient = 'support@360medics.fr';
        const subject = 'Demande de nouveau score';
        const body = `Cher Rhumatoscore, merci d'ajouter le score très utile à ma pratique clinique :`;
        const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;

        window.location.href = mailto;
    }

}

