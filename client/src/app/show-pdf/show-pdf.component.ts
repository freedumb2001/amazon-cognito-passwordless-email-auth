import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'show-pdf',
    templateUrl: 'show-pdf.component.html',
    styleUrls: ['./show-pdf.component.css'],
})
export class ShowPdfComponent {
    buttonColor1 = "primary";
    buttonColor2 = "primary";
    buttonColor3 = "primary";
    public pageViewMode = 'multiple';
    pdfSrc = '';
    pdfLabel = '';
    pdfSrcs = { '1': "https://planungsbuero-schulz.de/wp-content/uploads/2021/09/Expose-1.pdf", '2': "https://planungsbuero-schulz.de/wp-content/uploads/2022/05/Expose-2b.pdf" };
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

    pdf(id) {
        this.pdfBusy_.next(false);
        this.pdfSrc = this.pdfSrcs[id];
        this.pdfLabel = this.pdfLabels[id];
        console.log(this.pdfSrc)
    }

    async pdfRendered(event) {
        this.pdfRenderedBool = event;
        this.pdfBusy_.next(true);
    }

    goToPdf(id) {
        this.router.navigate(['/show-pdf', id]).then(() => {
            window.location.reload();
        })
    }

    navNext() {
        let id = this.pdfSrcKeys.indexOf(this.pdfId) + 1;
        if (id >= this.pdfSrcKeys.length) {
            id = 0
        }
        this.goToPdf(this.pdfSrcKeys[id])
    }

    navPrevious() {
        let id = this.pdfSrcKeys.indexOf(this.pdfId) - 1;
        if (id < 0) {
            id = this.pdfSrcKeys.length - 1
        }
        this.goToPdf(this.pdfSrcKeys[id])
    }

    home() { this.router.navigate(['/private']) }
}

