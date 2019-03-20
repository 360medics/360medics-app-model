
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';





@Injectable()
export class ReadJsonFileService {

    constructor(
        private http: Http
    ) {}

    getJsonData(filename: string) {
        return this.http.get(filename).pipe(map((res: any) => res.json())).toPromise();
    }
}
