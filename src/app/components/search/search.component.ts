import { Component, OnInit, Output, EventEmitter, HostListener, Input } from '@angular/core';
import { ReadJsonFileService } from '../../services';
import { Broadcaster } from '../../services/broadcaster.service';
import { Data, SearchBarData } from '../../interface';

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss']
})

export class SearchComponent implements OnInit {
    @Input() jsonData: Data;
    @Input() searchBar: SearchBarData;
    searchInput: string;

    @Output() searchValueChange: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _broadcaster: Broadcaster, private _jsonDataReader: ReadJsonFileService) {
        this.searchInput = '';
    }

    ngOnInit() {
        this._broadcaster.emit('search.input', {});
        this._broadcaster.on('go.back', (data) => {
            this.searchInput = '';
        });
    }

    filterAppsList(event) {
        this.searchInput = event.target.value;
        this.searchValueChange.emit({ needle: this.searchInput });
    }

    resetFilterAppsList() {
        this.searchInput = '';
        this.searchValueChange.emit({ needle: this.searchInput });
    }
}
