import { Component, OnInit, Input } from '@angular/core';
import {AppEntry} from '../../../interface';

@Component({
    selector: 'app-list',
    templateUrl: 'app.list.component.html',
    styleUrls: ['app.list.component.scss']
})

export class AppListComponent {
    @Input() apps: Array<AppEntry>;
}
