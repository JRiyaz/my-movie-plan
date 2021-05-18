import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserValidator } from 'src/app/classes/validator/user-validator';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z ]+$')
      ]),
      email: new FormControl('', [
        // RegisterValidator.required,
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ], UserValidator.uniqueEmail),
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
      ], UserValidator.uniqueMobile),
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

  onSubmit(): void {
    console.log(this.registerForm);

  }

  get email(): AbstractControl {
    return this.registerForm.get('email')!;
  }

  get mobile(): AbstractControl {
    return this.registerForm.get('mobile')!;
  }

  onGenderChange(event: any) {
    let male = this.genders[0].selected;
    let female = this.genders[1].selected;

    male = !male;
    female = !female;
    this.registerForm.get('gender')?.setValue(male ? this.genders[0].name : this.genders[1].name);
  }

}
