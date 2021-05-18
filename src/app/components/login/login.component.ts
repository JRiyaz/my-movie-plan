import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {

  public hidePassword: boolean = true;

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4),]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  onSubmit(): void {

  }

  get usernameErrors(): String {
    const username = this.loginForm.get('username');
    if (username?.hasError('required'))
      return 'Username cannot be empty';
    return username?.hasError('minlength') ? `Username should at-least be ${username?.errors?.minlength.requiredLength} characters` : '';
  }

  get passwordErrors(): String {
    const password = this.loginForm.get('password');
    if (password?.hasError('required'))
      return 'Password cannot be empty';
    return password?.hasError('minlength') ? `Password should at-least be ${password?.errors?.minlength.requiredLength} characters` : '';
  }

}
