import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  showAlert$ = new BehaviorSubject<boolean>(false);

  alertDanger$ = new BehaviorSubject<boolean>(false);

  alertMessage$ = new BehaviorSubject<string>('');

  hidePassword: boolean = true;

  loginForm!: FormGroup;

  redirect!: string;

  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router,
    private _activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.redirect = window.history.state?.redirect!;

    // console.log(this._globalService.isLoggedIn());

    if (this._userService.isLoggedIn())
      this._router.navigate(['/home'], { queryParams: { 'logged-in': true } });

    this._activeRoute.queryParams
      .subscribe(param => {
        if (param['sign-up']) {
          this.showAlert$.next(true);
          this.alertDanger$.next(false);
          this.alertMessage$.next('Registration successful. Please login');
        }
        else if (param['logout']) {
          this.showAlert$.next(true);
          this.alertDanger$.next(false);
          this.alertMessage$.next('Logout successful.');
        }
        else if (param['booking']) {
          this.showAlert$.next(true);
          this.alertDanger$.next(true);
          this.alertMessage$.next('Please Login to book tickets.');
        }
        else if (param['wrong']) {
          this.showAlert$.next(true);
          this.alertDanger$.next(true);
          this.alertMessage$.next('Something went wrong please login.');
        }
        else if (param['error']) {
          this.showAlert$.next(true);
          this.alertDanger$.next(true);
          this.alertMessage$.next(param['error']);
        }
        else if (param['login']) {
          this.showAlert$.next(true);
          this.alertDanger$.next(true);
          this.alertMessage$.next(param['error']);
        }
      });

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
    if (this.loginForm.valid)
      this._authService.loginUser(this.loginForm.value)
        .subscribe(
          res => {
            if (res.token)
              if (this._userService.setToken(res.token))
                this._router.navigate([this.redirect ? this.redirect : '/home'], { queryParams: { 'login': true } });
              else
                this._router.navigate(['/home'], { queryParams: { 'logged-in': true } });
          },
          err => {
            this.alertMessage$.next(err!);
            console.warn(err);
            this.showAlert$.next(true);
            this.alertDanger$.next(true);
          }
        );
  }

}
