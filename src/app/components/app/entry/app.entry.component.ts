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
    @Input() activatedCategory: string;
    currentCategory: string;
    appLink: string;

    constructor(private _broadcaster: Broadcaster, private _deviceDetectorService: DeviceDetectorService, private _jsonDataReader: ReadJsonFileService) {
    }

    ngOnInit() {
        if (this.app.isExternalLink) {
            if ( this.app.appLinkAndroid !== undefined && this.app.appLinkAndroid !== '' && this._deviceDetectorService.os === 'Android') {
                this.appLink = this.app.appLinkAndroid;
            } else {
                this.appLink = this.app.appLink;
            }
        } else {
            this.appLink = environment.toolPath + this.app.appLink;
        }
        if (typeof this.activatedCategory !== 'undefined') {
            this.currentCategory = this.activatedCategory;
        } else {
            this.currentCategory = 'Tout';
        }
        this._broadcaster.on('click.category', (event) => {
            this.currentCategory = event;
        });

    }

    open() {
        if (this.app.appEntries !== undefined && this.app.appEntries.length !== 0) {
            this._broadcaster.emit('open.list', { appEntries: this.app.appEntries, title: this.app.appTitle, isHome: this.app.isHome });
        } else {
            let finalLink = this.appLink;
            let target = '_blank';

            if (!this._deviceDetectorService.isDesktop()) {
                if (this.app.isInApp) {
                    finalLink = 'medics://application?m_source=' + this.appLink + '&m_open_in=INTERNAL_WEBVIEW';
                    target = '_self';
                } else {
                    finalLink = 'medics://viewer?m_source=' + this.appLink;
                    target = '_self';
                }
            }
            console.log(finalLink);
            !this.app.isExternalLink ? this.openAppInIframe() : window.open(finalLink, target);
        }
    }

    openAppInIframe() {
        this._broadcaster.emit('open.app.in.iframe', { url: this.appLink, title: this.app.appTitle, isHome: this.app.isHome });
    }
}
