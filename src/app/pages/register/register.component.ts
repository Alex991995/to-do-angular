import { NgFor } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { getCountries } from '@helpers/getNameCountries';
import { tap } from 'rxjs';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import countries from 'countries-phone-masks';
import { NgOptimizedImage } from '@angular/common';
import { convertPhoneMask } from '@helpers/convert-phone-mask';
import { Country } from '@interface/index';

@Component({
  selector: 'app-register',
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    NgxMaskDirective,
    NgOptimizedImage,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [provideNgxMask()],
})
export class RegisterComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  protected isDisabled = signal(true);
  protected countryNames = signal(getCountries());
  protected countries = countries;
  protected chosenCountry = signal<Country | undefined>(undefined);
  phoneMaskCountry = signal<string>('');

  mainData = this._formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    country: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  ngOnInit() {
    this.mainData.valueChanges.subscribe((res) => {
      this.isDisabled.set(!this.mainData.valid);
    });
  }
  changeCountry() {
    this.mainData.controls.phone.reset();
    const country = this.countries.find(
      (c) => c.name === this.mainData.controls.country.value
    );

    if (country) {
      this.chosenCountry.set(country);

      const mask = convertPhoneMask(country);
      console.log(mask);
      this.phoneMaskCountry.set(mask);
    }
  }

  get isValidName() {
    return (
      this.mainData.controls.name.touched &&
      this.mainData.controls.name.dirty &&
      this.mainData.controls.name.invalid
    );
  }

  get isValidEmail() {
    return (
      this.mainData.controls.email.touched &&
      this.mainData.controls.email.dirty &&
      this.mainData.controls.email.invalid
    );
  }

  onSubmit() {
    // console.log(this.mainData.controls.email.touched);
    // console.log(this.mainData.controls.name.dirty);
  }
}
