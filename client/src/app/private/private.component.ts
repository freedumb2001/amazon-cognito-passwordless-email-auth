// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/global-constants';
import Auth from '@aws-amplify/auth';

import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialog } from '../delete-user-dialog/delete-user-dialog.component'
// import { Expose1Content } from '../expose1-content/expose1-content.component'
// import { Expose1ContentPdf } from '../expose1-content-pdf/expose1-content-pdf.component'

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateComponent implements OnInit {
  buttonColor1 = "basic";
  buttonColor2 = "basic";

  wiederrufButtonText = GlobalConstants.wiederrufButtonText;

  pdfSrc = "https://planungsbuero-schulz.de/wp-content/uploads/2021/07/Expose-1.pdf";
  private userDetails_: BehaviorSubject<any[]> = new BehaviorSubject(undefined);
  public userDetails = this.userDetails_.asObservable();
  public userDetailsObj = {};
  public userDetailsForm = new FormGroup({});

  private busy_ = new BehaviorSubject(false);
  public busy = this.busy_.asObservable();

  private errorMessage_ = new BehaviorSubject('');
  public errorMessage = this.errorMessage_.asObservable();

  constructor(private router: Router, private auth: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getUserDetails();
  }

  public pdf1() {
    this.pdfSrc = "https://planungsbuero-schulz.de/wp-content/uploads/2021/07/Expose-1.pdf";
  }

  public pdf2() {
    this.pdfSrc = "https://planungsbuero-schulz.de/wp-content/uploads/2021/07/Expose-2.pdf";
  }

  public async getUserDetails() {
    this.busy_.next(true);
    this.errorMessage_.next('');
    try {
      const userDetails = await this.auth.getUserDetails();
      userDetails.forEach(detail => {
        // const control = new FormControl(detail.getValue());
        // this.userDetailsForm.addControl(detail.getName(), control);
        this.userDetailsObj[detail.getName()] = detail.getValue();
      });
      this.userDetails_.next(userDetails);
    } catch (err) {
      this.errorMessage_.next(err.message || err);
    } finally {
      this.busy_.next(false);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteUserDialog, {
      data: {
        userDetails: this.userDetailsObj
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Dialog result: ${result}`);
        this.deleteUser();
      }
    });
  }

  public signOut() {
    this.router.navigate(['/sign-out']);
  }

  public async deleteUser() {
    this.busy_.next(true);
    this.errorMessage_.next('');
    // this.router.navigate(['/sign-out']);
    try {
      // const userDetails = await this.auth.getUserDetails();
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: true // Optional, By default is false. 
      })
      // user.deleteUser((error, data) => {
      user.deleteUser((error, _) => {
        if (error) { throw error; }
        // Do something to delete user data in your system 
        // Log the user out 
        // this.router.navigate(['/sign-out']);
        this.signOut();
      });
      // this.router.navigate(['/sign-in']);
      // userDetails.forEach(detail => {
      //   const control = new FormControl(detail.getValue());
      //   this.userDetailsForm.addControl(detail.getName(), control);
      // });
      // this.userDetails_.next(userDetails);
    } catch (err) {
      this.errorMessage_.next(err.message || err);
    } finally {
      this.busy_.next(false);
      this.router.navigate(['/sign-in']);
    }
  }
}
