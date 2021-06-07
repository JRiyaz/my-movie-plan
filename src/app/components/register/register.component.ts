import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserValidator } from 'src/app/classes/validators/user-validator';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showAlert$ = new BehaviorSubject<boolean>(false);

  alertDanger$ = new BehaviorSubject<boolean>(false);

  alertMessage$ = new BehaviorSubject<string>('');

  hidePassword: boolean = true;

  registerForm!: FormGroup;

  genders: any[] = [
    { name: 'Male', selected: true },
    { name: 'Female', selected: false }
  ]

  constructor(private _fb: FormBuilder,
    private _router: Router,
    private _auth: AuthService,
    private _validator: UserValidator,
    private _userService: UserService) { }

  ngOnInit(): void {

    if (this._userService.isLoggedIn())
      this._router.navigate(['/home'], { queryParams: { 'logged-in': true } });

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
        // Validators.pattern('^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$')
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
      terms: new FormControl(true, Validators.requiredTrue)
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
      return `Invalid mobile number`;
    else if (mobile?.hasError('unique'))
      return 'Mobile already exists';
    return '';
  }

  get termsErrors(): string {
    const terms = this.registerForm.get('terms');
    if (terms?.hasError('required') && this.registerForm.touched)
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

    const sub = this._auth.registerUser(this.registerForm.value)
      .subscribe(
        res => this._router.navigate(['/user/login'], { queryParams: { 'sign-up': true } }),
        err => {
          this.showAlert$.next(true);
          this.alertDanger$.next(true);
          this.alertMessage$.next('Something went wrong');
        }
      );
  }

}
