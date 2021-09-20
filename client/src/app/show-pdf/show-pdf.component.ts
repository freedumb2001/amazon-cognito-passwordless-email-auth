import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'show-pdf',
    templateUrl: 'show-pdf.component.html',
    styleUrls: ['./show-pdf.component.css'],
})
export class ShowPdfComponent {
    // @Input() pdfSrc: string;
    buttonColor1 = "primary";
    buttonColor2 = "primary";
    buttonColor3 = "primary";
    private pagesCount: number = 0;
    public pageViewMode = 'multiple';
    pdfSrc = '';
    pdfLabel = '';
    pdfSrcs = { '1': "https://planungsbuero-schulz.de/wp-content/uploads/2021/08/Expose-1.pdf", '2': "https://planungsbuero-schulz.de/wp-content/uploads/2021/08/Expose-2.pdf" };
    pdfLabels = { '1': "Haus + Grundstück", '2': "Baugrundstück" };
    pdfId = '';
    pdfRenderedBool: boolean = false;
    private pdfBusy_ = new BehaviorSubject(false);
    public pdfBusy = this.pdfBusy_.asObservable();
    pdfSrcKeys = Object.keys(this.pdfSrcs)


    constructor(private route: ActivatedRoute, private router: Router) {
        // router.events.subscribe((event) => {
        //     console.log(event);
        // });
    }

    ngOnInit() {
        this.pdfId = this.route.snapshot.paramMap.get('id');
        this.pdf(this.pdfId);
    }

    public pdf(id) {
        this.pdfBusy_.next(false);
        this.pdfSrc = this.pdfSrcs[id];
        this.pdfLabel = this.pdfLabels[id];
        console.log(this.pdfSrc)
    }

    public async pdfRendered(event) {
        this.pdfRenderedBool = event;
        this.pdfBusy_.next(true);
    }

    public goToPdf(id) {
        this.router.navigate(['/show-pdf', id]).then(() => {
            window.location.reload();
        })
    }

    public navNext() {
        let id = this.pdfSrcKeys.indexOf(this.pdfId) + 1;
        if (id > this.pdfSrcKeys.length) {
            id = 0
        }
        this.goToPdf(this.pdfSrcKeys[id])
    }

    public navPrevious() {
        let id = this.pdfSrcKeys.indexOf(this.pdfId) - 1;
        if (id < 0) {
            id = this.pdfSrcKeys.length - 1
        }
        this.goToPdf(this.pdfSrcKeys[id])
    }

    public home() { this.router.navigate(['/private']) }
}

