import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data} from '../interface/model.interface';

@Injectable()
export class ReadJsonFileService {

    filename = '/assets/data.json';

    constructor(
        private http: HttpClient
    ) {}

    getJsonData(){
        return this.http.get(this.filename).toPromise();
    }
}
