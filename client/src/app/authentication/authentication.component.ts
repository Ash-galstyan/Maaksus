import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { ValidatePassword } from '../core/validations/validate-password';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  submitted = false;
  isNewAccount: boolean;
  userForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((account: any) => {
      this.isNewAccount = account.isNewAccount === 'true';
      this.mainForm();
    });
  }

  mainForm() {
    if (this.isNewAccount) {
      this.userForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.email]],
        address: ['', [Validators.required]],
        phoneNumber: ['', [Validators.pattern('^[0-9]+$')]],
        passwordValidation: this.fb.group({
          password: ['', Validators.required],
          verifyPassword: ['', Validators.required]
        }, {
          validator: ValidatePassword.MatchPassword
        })
      });
    } else {
      this.userForm = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', Validators.required]
      });
    }
  }

  updateProfile(e) {
    this.userForm.get('designation').setValue(e, {
      onlySelf: true
    });
  }

  get myForm() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const form = this.userForm.getRawValue();
    if (this.userForm.valid && !this.isNewAccount) {
      this.authService.login(form).subscribe((res) => {
        this.router.navigate(['/profile']);
      }, err => {
        console.log(err);
      });
    } else if (this.userForm.valid && this.isNewAccount) {
      form.password = form.passwordValidation.password;
      delete form.passwordValidation;
      this.authService.register(form).subscribe((res) => {
        this.router.navigate(['/profile']);
      },
      err => {
        console.log(err);
      });
    } else {
      return false;
    }
  }

}
