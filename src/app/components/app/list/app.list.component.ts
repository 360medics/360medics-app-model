import { Component, OnInit, Input } from '@angular/core';
import {AppEntry, Data} from '../../../interface';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
    selector: 'app-list',
    templateUrl: 'app.list.component.html',
    styleUrls: ['app.list.component.scss']
})

export class AppListComponent {
    @Input() apps: Array<AppEntry>;
    @Input() data: Data;
    @Input() activatedCategory: string;

    constructor(private _deviceDetectorService: DeviceDetectorService) {
    }


    contactUs() {
        const recipient = 'support@360medics.fr';
        const subject = 'Demande de nouveau score';
        const body = `Cher ` + this.data.appData.appCopyright.copyrightEntreprise + `, merci d'ajouter le score très utile à ma pratique clinique :`;
        const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;

        window.location.href = mailto;
    }

    openPDF(link: string, linkAndroid: string) {
        let finalLink = link;
        let target = '_blank';
        if (!this._deviceDetectorService.isDesktop()) {
            if (this._deviceDetectorService.os === 'Android') {
                finalLink = 'medics://viewer?m_source=' + linkAndroid;
                console.log('android');
            } else {
                finalLink = 'medics://viewer?m_source=' + link;
            }
            target = '_self';
        }
        window.open(finalLink, target);
    }

    openDocDeepLink(link: string, deepLink: string) {
        let finalLink = link;
        let target = '_blank';
        if (!this._deviceDetectorService.isDesktop()) {
            finalLink = deepLink;
            target = '_self';
        }
        window.open(finalLink, target);
    }
}
