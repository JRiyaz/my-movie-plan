import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserValidator } from 'src/app/classes/validator/user-validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ForgotPasswordComponent implements OnInit {

  public hidePassword: boolean = true;

  forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4)],
        UserValidator.isEmailOrMobilePresent),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  onSubmit(): void {

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
    return username?.hasError('minlength') ? `Username should at-least be ${username?.errors?.minlength.requiredLength} characters` : '';
  }

  get passwordErrors(): String {
    const password = this.forgotPasswordForm.get('password');
    if (password?.hasError('required'))
      return 'Password cannot be empty';
    return password?.hasError('minlength') ? `Password should at-least be ${password?.errors?.minlength.requiredLength} characters` : '';
  }

}
