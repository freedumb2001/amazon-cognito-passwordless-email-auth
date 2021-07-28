import { Component, Input } from '@angular/core';
// import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'expose1-content-pdf',
    templateUrl: 'expose1-content-pdf.component.html',
})
export class Expose1ContentPdf {
    @Input() pdfSrc: string;
    @Output() pdfRendered = new EventEmitter<boolean>();
    private pagesCount: number = 0;
    public pageViewMode = 'multiple';

    constructor() { }


    public onPagesLoaded(event) {
        console.log("PAGES LOADED", event)
    }

    public onPagesRendered(event) {
        console.log("PAGES RENDERED", event)
        if (event.pageNumber == 1) {

            this.pageViewMode = 'infinite-scroll';
            console.log("INFINITE", this.pageViewMode);
        }
        else if (this.pagesCount == event.pageNumber) {
            console.log("LAST PAGE RENDERED");
            this.pdfRendered.emit(true);
        }
    }
    public pdfLoaded(event) {
        this.pagesCount = event.pagesCount;
        console.log("PDF LOADED", event, this.pagesCount)
    }
}

