import { AbstractControl } from '@angular/forms';

export class ValidatePassword {

  static MatchPassword(abstractControl: AbstractControl) {
    const password = abstractControl.get('password') ? abstractControl.get('password').value : '';
    const confirmPassword = abstractControl.get('verifyPassword') ? abstractControl.get('verifyPassword').value : '';
    if (password !== confirmPassword) {
      abstractControl.get('verifyPassword').setErrors({
        MatchPassword: true
      });
    } else {
      return null;
    }
  }

}
