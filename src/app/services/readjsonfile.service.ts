
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';





@Injectable()
export class ReadJsonFileService {

    constructor(
        private http: HttpClient
    ) {}

    getJsonData(filename: string) {
        return this.http.get(filename).toPromise();
    }
}
