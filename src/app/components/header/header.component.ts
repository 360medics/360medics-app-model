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
    inApp: boolean;
    appTitle: string;
    inIframe: boolean;
    inClass: boolean;
    parentIsHome: Array<boolean> = new Array<boolean>();
    appsParentTitle: Array<string> = new Array<string>();

    constructor(private _broadcaster: Broadcaster, private _deviceDetectorService: DeviceDetectorService, private _jsonDataReader: ReadJsonFileService ) {
        this.inApp = true;
    }

    ngOnInit() {
        this._broadcaster.on('open.app.in.iframe', (data) => {
            this.inApp = false;
            this.appsParentTitle.push(this.appTitle);
            this.appTitle = data.title;
            this.inIframe = true;
        });

        this._broadcaster.on('close.app.iframe', (data) => {
            this.inIframe = false;
            this.appTitle = this.appsParentTitle.pop();
            if (this.inClass) {
                this.inApp = false;
            } else {
                this.inApp = true;
            }
        });

        this._broadcaster.on('go.back', (data) => {
            this.appTitle = this.appsParentTitle.pop();
            if (this.inClass) {
                if (this.parentIsHome.pop()) {
                    this.inApp = true;
                    this.inClass = false;
                } else {
                    this.inApp = false;
                }
            }
        });

        this._broadcaster.on('open.list', (data) => {
            this.inApp = false;
            this.inClass = true;
            this.appsParentTitle.push(this.appTitle);
            this.appTitle = data.title;
            this.parentIsHome.push(data.isHome);
        });

        this._broadcaster.on('update.title', (data) => {
            this.appTitle = data.title;
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
