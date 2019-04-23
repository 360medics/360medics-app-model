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

    constructor(private _broadcaster: Broadcaster, private _deviceDetectorService: DeviceDetectorService, private _jsonDataReader: ReadJsonFileService ) {
        this.inApp = true;
    }

    ngOnInit() {
        this._broadcaster.on('open.app.in.iframe', (data) => {
            this.inApp = false;
        });

        this._broadcaster.on('close.app.iframe', (data) => {
            this.inApp = true;
        });
    }

    closeViewer() {
        this._broadcaster.emit('close.app.iframe', {});
    }

    isDesktopDevice() {
        return this._deviceDetectorService.isDesktop();
    }
}
