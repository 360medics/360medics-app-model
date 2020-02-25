import {Component, OnInit} from '@angular/core';
import {ReadJsonFileService} from './services';
import {Data} from './interface';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apps: any = {
    searchBarData: null
  };
  data: Data;

  constructor (private _jsonDataReader: ReadJsonFileService, private titleService: Title) {
  }

  ngOnInit() {
    this._jsonDataReader.getJsonData().then((dataResponse: Data) => {
      this.data = dataResponse;
      this.titleService.setTitle(this.data.appData.headerData.headerTitle);
      if ( typeof  this.data.appData.searchBarData !== 'undefined') {
        this.apps.searchBarData = this.data.appData.searchBarData.searchBarPlaceholder;
      }

    });
  }

}
