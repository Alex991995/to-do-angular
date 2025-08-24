import { NgFor } from '@angular/common';
import {
  Component,
  effect,
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
  NgModel,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  MatStep,
  MatStepper,
  MatStepperModule,
} from '@angular/material/stepper';
import { getCountries } from '@helpers/getNameCountries';
import { tap } from 'rxjs';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import countries from 'countries-phone-masks';
import { NgOptimizedImage } from '@angular/common';
import { convertPhoneMask } from '@helpers/convert-phone-mask';
import { Country } from '@interface/index';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { isAdultFn } from '@helpers/validate-birth-date';

@Component({
  selector: 'app-register',
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    NgxMaskDirective,
    NgOptimizedImage,
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
  protected countryNames = signal(getCountries());
  protected countries = countries;
  protected chosenCountry = signal<Country | undefined>(undefined);
  protected phoneMaskCountry = signal<string>('');
  protected maxDate = signal(new Date());
  protected isAdult = signal(true);
  @ViewChild('step2') step2!: MatStep;

  protected mainData = this._formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ],
    ],
    country: ['', [Validators.required]],
    phone: [''],
  });

  protected additional = this._formBuilder.nonNullable.group({
    country: [this.chosenCountry() || '', [Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    date: [
      '',
      [Validators.required, this.customPasswordValidator(this.isAdult)],
    ],
    sex: ['', [Validators.required]],
    email: ['', [Validators.email]],
    name: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]+$')]],
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
      }
    };
  }

  skipStep(stepper: MatStepper) {
    this.step2.editable = false;
    this.step2.completed = true;
    stepper.selectedIndex += 2;
  }

  ngOnInit() {
    this.serviceRulesFormGroup.valueChanges.subscribe((res) => {
      console.log(this.serviceRulesFormGroup.valid);
    });
    this.additional.valueChanges.subscribe((res) => {
      console.log(this.additional.valid);
    });
    // this.additional.valueChanges.subscribe((res) => {});
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
      this.phoneMaskCountry.set(mask);
    }
  }

  // get isCompleted(){
  //   require ()
  // }

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

  onSubmit() {
    // console.log(this.mainData.controls.email.touched);
    // console.log(this.mainData.controls.name.dirty);
  }
}
