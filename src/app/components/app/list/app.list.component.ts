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
    @Input() activatedCategory: string;


    contactUs() {
        const recipient = 'meadjohnson.france@rb.com';
        const subject = 'Demande de guide';
        const mailto = `mailto:${recipient}?subject=${subject}`;
        console.log('started')
        window.location.href = mailto;
    }
}
