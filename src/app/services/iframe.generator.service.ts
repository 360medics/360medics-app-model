import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class IframeGeneratorService {

    private url: string;
    private r2: Renderer2;

    constructor() { }

    createWithRenderer2() {
        const iframe = this.r2.createElement('iframe');

        this.r2.setAttribute(iframe, 'src', this.url);

        this.r2.setAttribute(iframe, 'id', 'appstore-app-frame');
        this.r2.addClass(iframe, 'appstore-app-frame');

        this.r2.appendChild(document.body, iframe);

        // this.r2.listen(overlay, 'click', (e) => {
        //     this.r2.removeChild(document.body, iframe);
        //     this.r2.removeChild(document.body, overlay);
        // })
    }

    destroy() {
        this.r2.destroy();
    }

    setUrl(value: string) {
        this.url = value;
        return this;
    }

    setRenderer2(value: Renderer2) {
        this.r2 = value;
        return this;
    }
}
