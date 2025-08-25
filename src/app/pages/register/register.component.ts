import { NgFor } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatStep,
  MatStepper,
  MatStepperModule,
} from '@angular/material/stepper';
import { getCountries } from '@helpers/getNameCountries';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import countries from 'countries-phone-masks';
import { convertPhoneMask } from '@helpers/convert-phone-mask';
import { Country, IBody } from '@interface/index';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { isAdultFn } from '@helpers/validate-birth-date';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import {
  initialAdditionalData,
  initialMainData,
} from '@helpers/saved-data-input';

@Component({
  selector: 'app-register',
  imports: [
    FontAwesomeModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    NgxMaskDirective,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [provideNgxMask(), provideNativeDateAdapter()],
})
export class RegisterComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private router = inject(Router);
  protected countryNames = signal(getCountries());
  protected countries = countries;
  protected chosenCountry = signal<Country | undefined>(undefined);
  protected phoneMaskCountry = signal<string>('');
  protected countryCode = signal<string>('');
  protected chosenCountryName = signal<string>(initialMainData?.country || '');
  protected maxDate = signal(new Date());
  protected isAdult = signal(true);
  @ViewChild('step2') step2!: MatStep;

  faFacebook = faFacebook;
  faGoogle = faGoogle;
  faGithub = faGithub;
  protected mainData = this._formBuilder.nonNullable.group({
    email: [
      initialMainData?.email || '',
      [Validators.required, Validators.email],
    ],
    name: [
      initialMainData?.name || '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ],
    ],
    country: [initialMainData?.country || '', [Validators.required]],
    phone: [initialMainData?.phone || ''],
  });

  protected additional = this._formBuilder.nonNullable.group({
    country: [
      this.chosenCountryName() || initialAdditionalData?.country || '',
      [Validators.required],
    ],
    city: [initialAdditionalData?.city || '', [Validators.required]],
    street: [initialAdditionalData?.street || '', [Validators.required]],
    date: [
      initialAdditionalData?.date || '',
      [Validators.required, this.customPasswordValidator(this.isAdult)],
    ],
    sex: [initialAdditionalData?.sex || '', [Validators.required]],
    email: [initialAdditionalData?.email || '', [Validators.email]],
    name: [
      initialAdditionalData?.name || '',
      [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]+$')],
    ],
  });

  checkbox = new FormArray([
    new FormControl(false, Validators.requiredTrue),
    new FormControl(false, Validators.requiredTrue),
    new FormControl(false),
  ]);
  serviceRulesFormGroup = new FormGroup({
    serviceRules: this.checkbox,
  });

  customPasswordValidator(isAdult: Signal<boolean>) {
    return (control: AbstractControl) => {
      if (isAdult() === false) {
        this.additional.get('email')?.setValidators([Validators.required]);
        this.additional.get('name')?.setValidators([Validators.required]);
      } else if (isAdult()) {
        this.additional?.controls.email.clearValidators();
        this.additional?.controls.name.clearValidators();
        this.additional?.controls.email.updateValueAndValidity();
        this.additional?.controls.name.updateValueAndValidity();
      }
    };
  }

  skipStep(stepper: MatStepper) {
    this.mainData.patchValue({
      email: 'sdwd@gmail.com',
      name: 'Ivan',
      phone: '+375293455676',
    });

    this.step2.editable = false;
    this.step2.completed = true;
    stepper.selectedIndex += 2;
  }

  ngOnInit() {
    this.mainData.valueChanges.subscribe((res) => {
      localStorage.setItem('saved-form-mainData', JSON.stringify(res));
    });

    this.additional.valueChanges.subscribe((res) => {
      localStorage.setItem('saved-form-additional', JSON.stringify(res));
    });
  }
  dateChangeEvent(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.isAdult.set(isAdultFn(event.value));
      this.additional.get('date')?.updateValueAndValidity();
    }
  }
  changeCountry() {
    this.mainData.controls.phone.reset();
    const country = this.countries.find(
      (c) => c.name === this.mainData.controls.country.value
    );

    if (country) {
      this.chosenCountry.set(country);
      this.additional.controls.country.setValue(country.name);
      const mask = convertPhoneMask(country);
      this.countryCode.set(country.code);
      this.chosenCountryName.set(country.name);
      this.phoneMaskCountry.set(mask);
    }
  }

  onSubmit() {
    const mainData = this.mainData.controls;
    const additional = this.additional.controls;

    const body: IBody = {
      country: additional.country.value,
      email: mainData.email.value,
      name: mainData.name.value,
      phone: this.countryCode() + mainData.phone.value,

      city: additional.city.value,
      street: additional.street.value,
      date: additional.date.value.toLocaleString(),
      sex: additional.sex.value,
      emailAdult: additional.email.value || null,
      nameAdult: additional.name.value || null,
    };
    console.log(body);
    localStorage.removeItem('saved-form-mainData');
    localStorage.removeItem('saved-form-additional');
    // this.router.navigate(['/']);
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
  get isValidEmailForAdult() {
    return (
      this.additional.controls.email.touched &&
      this.additional.controls.email.dirty &&
      this.additional.controls.email.invalid
    );
  }
  get isValidNameForAdult() {
    return (
      this.additional.controls.name.touched &&
      this.additional.controls.name.dirty &&
      this.additional.controls.name.invalid
    );
  }

  get isValidCity() {
    return (
      this.additional.controls.city.touched &&
      this.additional.controls.city.dirty &&
      this.additional.controls.city.invalid
    );
  }

  get isValidStreet() {
    return (
      this.additional.controls.street.touched &&
      this.additional.controls.street.dirty &&
      this.additional.controls.street.invalid
    );
  }

  get isDisabledMainData() {
    return this.mainData.invalid;
  }

  get isDisabledAdditional() {
    return this.additional.invalid;
  }
}
