// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  buttonColor1 = "primary";
  buttonColor2 = "primary";
  public email = new FormControl('');

  private busy1_ = new BehaviorSubject(false);
  public busy1 = this.busy1_.asObservable();
  private busy2_ = new BehaviorSubject(false);
  public busy2 = this.busy2_.asObservable();

  private errorMessage_ = new BehaviorSubject('');
  public errorMessage = this.errorMessage_.asObservable();

  constructor(private router: Router, private auth: AuthService) { }

  public async signUp() {
    this.busy1_.next(true);
    this.errorMessage_.next('');
    try {
      this.router.navigate(['/sign-up']);
    } catch (err) {
      this.errorMessage_.next(err.message || err);
    } finally {
      this.busy1_.next(false);
    }
  }

  public async signIn() {
    this.busy2_.next(true);
    this.errorMessage_.next('');
    try {
      await this.auth.signIn(this.email.value);
      this.router.navigate(['/enter-secret-code']);
    } catch (err) {
      this.errorMessage_.next(err.message || err);
    } finally {
      this.busy2_.next(false);
    }
  }
}
