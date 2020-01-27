import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data} from '../interface/model.interface';
import { environment } from '../../environments/environment'

@Injectable()
export class ReadJsonFileService {

    filename = `./assets/${environment.jsonFileName}.json`;

    constructor(
        private http: HttpClient
    ) {}

    getJsonData(){
        return this.http.get(this.filename).toPromise();
    }
}
