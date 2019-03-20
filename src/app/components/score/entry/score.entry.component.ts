import { Component, OnInit, Input } from '@angular/core';
import { ScoreInterface } from '../../../interface';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Broadcaster } from '../../../services/broadcaster.service';

@Component({
    selector: 'app-score-entry',
    templateUrl: 'score.entry.component.html',
    styleUrls: ['score.entry.component.scss']
})

export class ScoreEntryComponent implements OnInit {
    @Input() score: ScoreInterface;
    @Input() lastEntry: boolean;

    constructor(private _broadcaster: Broadcaster,
        private _deviceDetectorService: DeviceDetectorService) { }

    ngOnInit() { }

    open() {
        let finalLink = this.score.link;
        let target = "_blank";

        if (!this._deviceDetectorService.isDesktop()) {
            finalLink = 'medics://viewer?m_source=' + this.score.link
            target = '_self';
        }

        this.score.owner ? this.openAppInIframe() : window.open(finalLink, target);
    }

    openAppInIframe() {
        this._broadcaster.emit('open.score.in.iframe', { url: this.score.link, title: this.score.title });
    }

    contactUs() {
        const recipient = 'support@360medics.fr';
        const subject = 'Demande de nouveau score';
        const body = `Chère Rhumatoscore, merci d'ajouter le score très utile à ma pratique clinique :`;
        const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;

        window.location.href = mailto;
    }
}