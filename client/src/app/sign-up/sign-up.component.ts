// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';

function emailDomainValidator(control: FormControl) {
  let email = control.value;
  if (email && email.indexOf("@") != -1) {
    let [_, domain] = email.split("@");
    if (domain !== "codecraft.tv") {
      return {
        emailDomain: {
          parsedDomain: domain
        }
      }
    }
  }
  return null;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {

  givenName = new FormControl('', Validators.required,);
  familyName = new FormControl('', Validators.required,);
  email = new FormControl('', [
    Validators.required,
    // Validators.pattern("[^ @]*@[^ @]*"),
    // emailDomainValidator
  ]);

  widerrufsbelehrung = new FormControl('', [Validators.required]);
  provisionspflichtig = new FormControl('', [Validators.required]);
  zugriff = new FormControl('', [Validators.required]);

  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;

  private busy_ = new BehaviorSubject(false);
  public busy = this.busy_.asObservable();

  private errorMessage_ = new BehaviorSubject('');
  public errorMessage = this.errorMessage_.asObservable();

  constructor(private router: Router, private auth: AuthService) { }

  public async signup() {
    // let fe = false;
    // if (this.widerrufsbelehrung.invalid) { this.widerrufsbelehrung.markAsDirty(); fe = true }
    // if (this.provisionspflichtig.invalid) { this.provisionspflichtig.markAsDirty(); fe = true }
    // if (this.zugriff.invalid) { this.zugriff.markAsDirty(); fe = true }
    // if (this.givenName.invalid) { this.givenName.markAsDirty(); fe = true }
    // if (this.email.invalid) { this.email.markAsDirty(); fe = true }
    // if (fe) { return };

    // TODO create formgroup
    let fc = [this.widerrufsbelehrung, this.provisionspflichtig, this.zugriff, this.email, this.givenName, this.familyName]

    for (let c of fc) {
      if (c.invalid) { c.markAsDirty() }
    }
    for (let c of fc) {
      if (c.invalid) { return }
    }


    this.errorMessage_.next('');
    this.busy_.next(true);
    try {
      // this.email.valid;
      console.log(this.email.valid);
      await this.auth.signUp(this.email.value, this.givenName.value);
      await this.auth.signIn(this.email.value);
      this.router.navigate(['/enter-secret-code']);
    } catch (err) {
      console.log(err);
      this.errorMessage_.next(err.message || err);
    } finally {
      this.busy_.next(false);
    }
  }
}
