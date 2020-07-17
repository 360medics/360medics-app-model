import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Broadcaster } from '../../services/broadcaster.service';
import { ReadJsonFileService } from '../../services';
import { Data } from '../../interface';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})

export class HeaderComponent implements OnInit {
    @Input() data: Data;
    // indicates if we are on the homepage
    inApp: boolean;
    appTitle: string;
    // indicates that the component is open in the iframe
    inIframe: boolean;
    // indicates if the parent appEntry is on the home page
    parentIsHome: Array<boolean> = new Array<boolean>();
    // parent appEntry title
    parentTitle: Array<string> = new Array<string>();


    constructor(private _broadcaster: Broadcaster, private _deviceDetectorService: DeviceDetectorService, private _jsonDataReader: ReadJsonFileService ) {
        this.inApp = true;
    }

    ngOnInit() {
        this._broadcaster.on('open.app.in.iframe', (data) => {
            this.inApp = false;
            this.inIframe = true;
            this.parentTitle.push(this.appTitle);
            this.parentIsHome.push(data.isHome);
            this.appTitle = data.title;
        });

        this._broadcaster.on('open.list', (data) => {
            this.inApp = false;
            this.inIframe = false;
            this.parentTitle.push(this.appTitle);
            this.parentIsHome.push(data.isHome);
            this.appTitle = data.title;
        });

        this._broadcaster.on('close.app.iframe', (data) => {
            this.inIframe = false;
            this.appTitle = this.parentTitle.pop();
            if (this.parentIsHome.pop()) {
                this.inApp = false;
            } else {
                if (this.parentIsHome.length !== 0) {
                    this.inApp = false;
                } else {
                    this.inApp = true;
                }
            }
        });

        this._broadcaster.on('go.back', (data) => {
            this.appTitle = this.parentTitle.pop();
            if (this.parentIsHome.pop()) {
                this.inApp = true;
            } else {
                if (this.parentIsHome.length !== 0) {
                    this.inApp = false;
                } else {
                    this.inApp = true;
                }
            }
        });

    }

    closeViewer() {
        if (this.inIframe) {
            this._broadcaster.emit('close.app.iframe', {});
        } else {
            this._broadcaster.emit('go.back', {});
        }
    }

    isDesktopDevice() {
        return this._deviceDetectorService.isDesktop();
    }
}
