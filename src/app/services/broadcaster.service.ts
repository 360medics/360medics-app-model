import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class Broadcaster {
    private eventBus$: Subject<any> = new Subject();

    on(key: string, next, error = () => { }, complete = () => { }): Subscription {
        return this.eventBus$.pipe(filter(e => e.key === key)).pipe(map(e => e.data)).subscribe(next, error, complete)
    }

    emit(key: any, data?: any) {
        this.eventBus$.next({ key, data });
    }

    broadcast(key: any, data?: any) {
        console.warn(`broadcaster.ts Method ::broadcast() is deprecated, use ::emit() instead`)
        this.eventBus$.next({ key, data });
    }
}
