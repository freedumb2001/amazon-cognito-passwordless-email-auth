import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';

@Component({
    selector: 'delete-user-dialog',
    templateUrl: 'delete-user-dialog.component.html',
})
export class DeleteUserDialog {
    widerrufButtonText = GlobalConstants.widerrufButtonText;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
    }
}
