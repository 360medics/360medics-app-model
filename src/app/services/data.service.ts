import {Injectable} from '@angular/core';
import {ReadJsonFileService} from './readjsonfile.service';
import {AppEntry, Data, AppData} from '../interface';
import { environment } from '../../environments/environment'

@Injectable()
export class DataService {
    filename = `./assets/${environment.jsonFileName}.json`;
    data: Data;

    constructor (private jsonFileReader: ReadJsonFileService) {
    }

    getThemeData(): AppData {
        return this.data.appData;
    }

    getAppEntries():  AppEntry[] {
        return this.data.appEntries;
    }

}
