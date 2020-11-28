import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

import { Subscription } from 'rxjs/internal/Subscription';
import { HomeService, servicesList } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  screenMedia: Subscription;
  deviceXs: boolean;
  subscription: Subscription[] = [];
  siteinfoSubscription: Subscription;
  siteservicesSubscription: Subscription;
  formSubscription: Subscription;
  siteservices: servicesList[];
  siteInfos: any;
  form: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder,
    private homeservices: HomeService,
    private screenObserver: MediaObserver) { }

  ngOnInit(): void {
    this.getScreenMedia();
    this.initForm();
    this.getSiteInfo();
    this.getSiteServices();
  }

  getScreenMedia() {
    this.screenMedia = this.screenObserver.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    });
  }

  // get form value
  get f() { return this.form.controls; }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email]],
      yourNumber: ['', Validators.required],
      intrestedIn: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return  console.log('Error!! :-)\n\n' + JSON.stringify(this.form.value))
    } else {

      this.formSubscription = this.homeservices.submitForm(
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.email,
        this.form.value.yourNumber,
        this.form.value.intrestedIn
        ).subscribe((result) => {
          console.log(result);
        }, error => {
          console.log(error);
          alert(error.message);
        })
      }
  }

  getSiteInfo() {
    this.siteinfoSubscription = this.homeservices.getSiteInfo()
    .subscribe((result: any) => {
      this.siteInfos = result;
    });

    this.subscription.push(this.siteinfoSubscription);
  }

  getSiteServices() {
    this.siteservicesSubscription = this.homeservices.getSiteServices()
    .subscribe((result: any) => {
      this.siteservices = result;
    });

    this.subscription.push(this.siteservicesSubscription);
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
