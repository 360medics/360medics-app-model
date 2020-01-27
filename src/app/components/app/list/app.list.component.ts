import { Component, OnInit, Input } from '@angular/core';
import {AppEntry, Data} from '../../../interface';

@Component({
    selector: 'app-list',
    templateUrl: 'app.list.component.html',
    styleUrls: ['app.list.component.scss']
})

export class AppListComponent {
    @Input() apps: Array<AppEntry>;
    @Input() data: Data;


    contactUs() {
        const recipient = 'support@360medics.fr';
        const subject = 'Demande de nouveau score';
        const body = `Cher ` + this.data.appData.appCopyright.copyrightEntreprise + `, merci d'ajouter le score très utile à ma pratique clinique :`;
        const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;

        window.location.href = mailto;
    }
}
