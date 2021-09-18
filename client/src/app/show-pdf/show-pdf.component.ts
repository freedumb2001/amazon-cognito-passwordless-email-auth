import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'show-pdf',
    templateUrl: 'show-pdf.component.html',
})
export class ShowPdfComponent {
    // @Input() pdfSrc: string;

    private pagesCount: number = 0;
    public pageViewMode = 'multiple';
    pdfSrc = '';
    pdfSrcs = { '1': "https://planungsbuero-schulz.de/wp-content/uploads/2021/08/Expose-1.pdf", '2': "https://planungsbuero-schulz.de/wp-content/uploads/2021/08/Expose-2.pdf" };
    pdfId = '';
    pdfRenderedBool: boolean = false;
    private pdfBusy_ = new BehaviorSubject(false);
    public pdfBusy = this.pdfBusy_.asObservable();


    constructor(private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.pdfId = this.route.snapshot.paramMap.get('id');
        this.pdf();
    }

    public pdf() {
        this.pdfBusy_.next(false);
        this.pdfSrc = this.pdfSrcs[this.pdfId];
    }

    public async pdfRendered(event) {
        this.pdfRenderedBool = event;
        this.pdfBusy_.next(true);
    }
}

