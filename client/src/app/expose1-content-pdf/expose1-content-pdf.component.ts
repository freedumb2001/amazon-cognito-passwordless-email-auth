import { Component, Input } from '@angular/core';
// import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
    selector: 'expose1-content-pdf',
    templateUrl: 'expose1-content-pdf.component.html',
})
export class Expose1ContentPdf {
    @Input() pdfSrc: string;
    constructor() { }
    // pfdSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
    // constructor() { pdfDefaultOptions.assetsFolder = '/'; }

    public onPagesLoaded(event) {
        console.log("PAGES LOADED", event)
    }

    public onPagesRendered(event) {
        console.log("PAGES RENDERED", event)
    }
    public pdfLoaded(event) {
        console.log("PDF LOADED", event)
    }
}

