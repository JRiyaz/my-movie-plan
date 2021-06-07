import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserValidator } from 'src/app/classes/validators/user-validator';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  @ViewChild(FormGroupDirective) passwordForm!: FormGroupDirective;

  showAlert$ = new BehaviorSubject<boolean>(false);

  alertDanger$ = new BehaviorSubject<boolean>(false);

  alertMessage$ = new BehaviorSubject<string>('');

  public hidePassword: boolean = true;

  forgotPasswordForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    private _auth: AuthService,
    private _validator: UserValidator,
    private _userService: UserService,
    private _router: Router) { }

  ngOnInit(): void {

    if (this._userService.isLoggedIn())
      this._router.navigate(['/home'], { queryParams: { 'logged-in': true } });

    this.forgotPasswordForm = this._fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4)],
        this._validator.isEmailOrMobilePresent),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  get username(): AbstractControl {
    return this.forgotPasswordForm.get('username')!;
  }

  get usernameErrors(): String {
    const username = this.forgotPasswordForm.get('username');
    if (username?.hasError('required'))
      return 'Username cannot be empty';
    else if (username?.hasError('present'))
      return "Username doesn't exists";
    else if (username?.hasError('minlength'))
      return `Username should at-least be ${username?.errors?.minlength.requiredLength} characters`
    return '';
  }

  get passwordErrors(): String {
    const password = this.forgotPasswordForm.get('password');
    if (password?.hasError('required'))
      return 'Password cannot be empty';
    else if (password?.hasError('minlength'))
      return `Password should at-least be ${password?.errors?.minlength.requiredLength} characters`
    return '';
  }

  onSubmit(): void {
    this._auth.forgotPassword(this.forgotPasswordForm.value)
      .subscribe(
        res => {
          this.showAlert$.next(true);
          this.alertDanger$.next(false);
          this.alertMessage$.next(res.message);
          if (res.statusCode == 200)
            this.passwordForm.resetForm();
        },
        err => {
          this.showAlert$.next(true);
          this.alertDanger$.next(true);
          this.alertMessage$.next('Something went wrong');
        }
      );
  }
}
