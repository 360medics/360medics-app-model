import { Component, OnInit, Input } from '@angular/core';
import { ScoreInterface } from '../../../interface';

@Component({
    selector: 'app-score-list',
    templateUrl: 'score.list.component.html',
    styleUrls: ['score.list.component.scss']
})

export class ScoreListComponent implements OnInit {

    @Input() scores: Array<ScoreInterface>;
    constructor() { }

    ngOnInit() { }
}