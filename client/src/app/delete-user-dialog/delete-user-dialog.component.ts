import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
    selector: 'delete-user-dialog',
    templateUrl: 'delete-user-dialog.component.html',
})
export class DeleteUserDialog {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        // will log the entire data object
        console.log(this.data)
    }
    panelOpenState1 = false;
    panelOpenState2 = false;
    panelOpenState3 = false;
}
