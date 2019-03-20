import { Component, OnInit } from '@angular/core';
import { CategorySingleton } from '../../model/category';
import { Broadcaster } from '../../services/broadcaster.service';

import { config } from '../../config/config';

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss']
})

export class FooterComponent implements OnInit {
    hide: boolean;
    activated: string;
    menuItems: Array<any> = [];

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

        this.menuItems = config.menu;
        console.log(this.menuItems);
    }

    filter(menuItem: any) {
        this.activated = menuItem.title;
        this._broadcaster.emit('filter.on.scores.category', { category: menuItem.target })
    }
}
