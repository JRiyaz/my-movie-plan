import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true;

  loginForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    private _bar: MatSnackBar,
    private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  get usernameErrors(): String {
    const username = this.loginForm.get('username');
    if (username?.hasError('required'))
      return 'Username cannot be empty';
    else if (username?.hasError('minlength'))
      return `Username should at-least be ${username?.errors?.minlength.requiredLength} characters`;
    return '';
  }

  get passwordErrors(): String {
    const password = this.loginForm.get('password');
    if (password?.hasError('required'))
      return 'Password cannot be empty';
    else if (password?.hasError('minlength'))
      return `Password should at-least be ${password?.errors?.minlength.requiredLength} characters`
    return '';
  }

  onSubmit(): void {
    let message;
    this._auth.registerUser(this.loginForm.value)
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
