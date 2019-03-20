import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss']
})

export class SearchComponent implements OnInit {

    @Output() searchValueChange: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }
    
    filterScoresList(needle: string) {
        this.searchValueChange.emit({ needle: needle });
    }
}