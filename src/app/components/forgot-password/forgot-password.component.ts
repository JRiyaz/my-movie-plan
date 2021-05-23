import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserValidator } from 'src/app/classes/validators/user-validator';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ForgotPasswordComponent implements OnInit {

  public hidePassword: boolean = true;

  forgotPasswordForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    private _bar: MatSnackBar,
    private _auth: AuthService,
    private _router: Router,
    private _validator: UserValidator) { }

  ngOnInit(): void {
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
    let message;
    this._auth.registerUser(this.forgotPasswordForm.value)
      .subscribe(
        data => message = data,
        err => console.log(err)
      );

    console.log(message);

    if (message)
      this._bar.open(message, 'Home', {
        duration: 3000,
        verticalPosition: 'bottom', // 'top' | 'bottom'
        horizontalPosition: 'end', //'start' | 'center' | 'end' | 'left' | 'right'
        panelClass: ['red-snackbar'],
      }
      ).onAction().subscribe(
        res => this._router.navigate(['./login'])
      );
  }
}
