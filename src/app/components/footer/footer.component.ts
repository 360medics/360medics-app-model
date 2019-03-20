import { Component, OnInit } from '@angular/core';
import { CategorySingleton } from '../../model/category';
import { Broadcaster } from '../../services/broadcaster.service';

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss']
})

export class FooterComponent implements OnInit {
    hide: boolean;
    activated: string;

    constructor(private _broadcaster: Broadcaster) {
        this.hide = false;
        this.activated = 'all';
    }

    ngOnInit() {
        this._broadcaster.on('open.score.in.iframe', (data) => {
            this.hide = true;
        });

        this._broadcaster.on('close.score.iframe', (data) => {
            this.hide = false;
        });
    }

    filter(category: number = null) {
        let cat: string | null;

        switch (category) {
            case 1:
                cat = CategorySingleton.ACTIVITY;
                this.activated = 'activity';
                break;

            case 2:
                cat = CategorySingleton.DIAGNOSTIC;
                this.activated = 'diagnostic';
                break;

            default:
                cat = null;
                this.activated = 'all';
                break;
        }

        this._broadcaster.emit('filter.on.scores.category', { category: cat })
    }
}