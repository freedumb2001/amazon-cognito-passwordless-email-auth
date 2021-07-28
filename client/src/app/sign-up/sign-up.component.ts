// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';

// function emailDomainValidator(control: FormControl) {
//   let email = control.value;
//   if (email && email.indexOf("@") != -1) {
//     let [_, domain] = email.split("@");
//     if (domain !== "codecraft.tv") {
//       return {
//         emailDomain: {
//           parsedDomain: domain
//         }
//       }
//     }
//   }
//   return null;
// }

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  buttonColor = "primary";
  // givenName = new FormControl('', Validators.required,);
  // familyName = new FormControl('', Validators.required,);
  fullName = new FormControl('', Validators.required,);
  email = new FormControl('', [
    Validators.required,
    Validators.pattern("[^ @]*@[^ @]*"),
    // emailDomainValidator
  ]);
  wiederrufButtonText = GlobalConstants.wiederrufButtonText;
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

    // TODO create formgroup
    // let fc = [this.widerrufsbelehrung, this.provisionspflichtig, this.zugriff, this.email, this.givenName, this.familyName]
    let fc = [this.widerrufsbelehrung, this.provisionspflichtig, this.zugriff, this.email, this.fullName]

    for (let c of fc) {
      if (c.invalid) { c.markAsDirty() }
    }
    for (let c of fc) {
      if (c.invalid) { return }
    }


    this.errorMessage_.next('');
    this.busy_.next(true);
    try {
      console.log(this.email.valid);
      await this.auth.signUp(this.email.value, this.fullName.value);
      await this.auth.signIn(this.email.value);
      this.router.navigate(['/enter-secret-code']);
    } catch (err) {
      console.log(err);
      let message = GlobalConstants.errorMessageTranslations[err.code] || err.message;
      this.errorMessage_.next(message || err);
    } finally {
      this.busy_.next(false);
    }
  }
}
