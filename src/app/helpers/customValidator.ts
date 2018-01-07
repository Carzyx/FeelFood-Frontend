import { FormGroup } from '@angular/forms';

export class CustomValidator {

  validatePhoneNumber(controls) {
    const regExp = new RegExp(/^[0-9\-\+]{9,12}$/);
    // Test phone number against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid phone number
    } else {
      return { 'validatePhoneNumber': true }; // Return as invalid phone number
    }
  }

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true }; // Return as invalid email
    }
  }

  validatePostalCode(controls) {
    const regExp = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid postal code
    } else {
      return { 'validatePostalCode': true }; // Return as invalid postal code
    }
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true }; // Return as error: do not match
      }
    };
  }
}
