// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PrivateComponent } from './private/private.component';
import { AnswerChallengeComponent } from './answer-challenge/answer-challenge.component';
import { SignOutComponent } from './sign-out/sign-out.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { DeleteUserDialog } from './delete-user-dialog/delete-user-dialog.component';
import { Expose1ContentPdf } from './expose1-content-pdf/expose1-content-pdf.component'

const MAT_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatIconModule,
  MatDialogModule,
  MatDividerModule
];
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    PrivateComponent,
    AnswerChallengeComponent,
    SignOutComponent,
    NotFoundComponent,
    DeleteUserDialog,
    Expose1ContentPdf
  ],
  imports: [
    NgxExtendedPdfViewerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ...MAT_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeleteUserDialog]
})
export class AppModule { }
