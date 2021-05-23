import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserValidator } from 'src/app/classes/validators/user-validator';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RegisterComponent implements OnInit {

  hidePassword: boolean = true;

  registerForm!: FormGroup;

  genders: any[] = [
    { name: 'Male', selected: true },
    { name: 'Female', selected: false }
  ]

  constructor(private _fb: FormBuilder,
    private _auth: AuthService,
    private _bar: MatSnackBar,
    private _router: Router,
    private _validator: UserValidator) { }

  ngOnInit(): void {

    this.registerForm = this._fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z ]+$')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ], this._validator.uniqueEmail),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        Validators.pattern('^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$')
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ], this._validator.uniqueMobile),
      gender: new FormControl('Male', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      terms: new FormControl(false, [Validators.required])
    })
  }

  get nameErrors(): string {
    const name = this.registerForm.get('name');
    if (name?.hasError('required'))
      return 'Name cannot be empty';
    else if (name?.hasError('minlength'))
      return `Name should at-least be ${name?.errors?.minlength.requiredLength} characters`;
    else if (name?.hasError('maxlength'))
      return `Name should not exceed ${name?.errors?.minlength.requiredLength} characters`;
    else if (name?.hasError('pattern'))
      return 'Invalid Name';
    return '';
  }

  get emailErrors(): string {
    const email = this.registerForm.get('email');
    if (email?.hasError('required'))
      return 'Email cannot be empty';
    else if (email?.hasError('minlength'))
      return `Email should at-least be ${email?.errors?.minlength.requiredLength} characters`;
    else if (email?.hasError('maxlength'))
      return `Email should not exceed ${email?.errors?.minlength.requiredLength} characters`;
    else if (email?.hasError('email'))
      return 'Invalid Email';
    else if (email?.hasError('unique'))
      return 'Email already exists';
    return '';
  }

  get passwordErrors(): string {
    const password = this.registerForm.get('password');
    if (password?.hasError('required'))
      return 'Password cannot be empty';
    else if (password?.hasError('minlength'))
      return `Password should at-least be ${password?.errors?.minlength.requiredLength} characters`;
    else if (password?.hasError('maxlength'))
      return `Password should not exceed ${password?.errors?.minlength.requiredLength} characters`;
    return '';
  }

  get mobileErrors(): string {
    const mobile = this.registerForm.get('mobile');
    if (mobile?.hasError('required'))
      return 'Mobile cannot be empty';
    else if (mobile?.hasError('minlength'))
      return `Mobile should at-least be ${mobile?.errors?.minlength?.requiredLength} characters`;
    else if (mobile?.hasError('maxlength'))
      return `Mobile should not exceed ${mobile?.errors?.maxlength?.requiredLength} characters`;
    else if (mobile?.hasError('pattern'))
      return `Mobile no must starts with 9, 8 or, 7`;
    else if (mobile?.hasError('unique'))
      return 'Mobile already exists';
    return '';
  }

  get termsErrors(): string {
    const terms = this.registerForm.get('terms');
    if (terms?.hasError('required'))
      return 'Please accept terms and conditions';
    return '';
  }

  get email(): AbstractControl {
    return this.registerForm.get('email')!;
  }

  get mobile(): AbstractControl {
    return this.registerForm.get('mobile')!;
  }

  onSubmit(): void {
    let message;
    this._auth.registerUser(this.registerForm.value)
      .subscribe(
        data => message = data,
        err => console.log(err)
      );

    console.log(message);

    if (message)
      this._bar.open(message, 'Login', {
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
