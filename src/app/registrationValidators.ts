import {FormControl} from '@angular/forms';

export class RegistrationValidators {
  static emeil(control: FormControl): {[key: string]: boolean} {
    if (new RegExp('^[\\w.-]+@[\\w-]+\\.[\\w]+$').test(control.value)) {
      return null;
    }
    return {incorrectEmeil: true};
  }
  static password(control: FormControl): {[key: string]: boolean} {
    if (control.value.length > 6 && new RegExp('[A-Z]').test(control.value) &&
      new RegExp('[a-z]').test(control.value) && new RegExp('[0-9]').test(control.value)) {
      return null;
    }
    return {incorrectPassword: true};
  }

  static login(control: FormControl): {[key: string]: boolean} {
    if (new RegExp('^[\\w.-]+$').test(control.value)) {
      return null;
    }
    return {incorrectLogin: true};
  }
}
