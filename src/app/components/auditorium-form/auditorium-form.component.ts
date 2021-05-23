import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApplicationValidator } from 'src/app/classes/validators/application-validator';
import { ApplicationService } from 'src/app/services/application/application.service';

@Component({
  selector: 'app-auditorium-form',
  templateUrl: './auditorium-form.component.html',
  styleUrls: ['./auditorium-form.component.css']
})
export class AuditoriumFormComponent implements OnInit {

  auditoriumForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    private _bar: MatSnackBar,
    private _service: ApplicationService,
    private _router: Router,
    private _validator: ApplicationValidator) { }

  ngOnInit(): void {
    this.auditoriumForm = this._fb.group({
      name: new FormControl('', [
        Validators.required,
        this._validator.uniqueAuditoriumName
      ]),
      image: new FormControl(''),
      email: new FormControl('', Validators.required),
      customerCareNo: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      seatCapacity: new FormControl(90, Validators.required),
      facilities: new FormArray([]),
      safeties: new FormArray([]),
      shows: new FormArray([])
    })
  }

  get shows(): FormArray {
    return this.auditoriumForm.get('shows') as FormArray;
  }

  get facilities(): FormArray {
    return this.auditoriumForm.get('facilities') as FormArray;
  }

  get safeties(): FormArray {
    return this.auditoriumForm.get('safeties') as FormArray;
  }

  addFacility(): void {
    console.log(this.auditoriumForm.get('facilities')?.value);

    if (this.facilities.status == "INVALID") {
      this._bar.open('Please complete the above fields', 'OK', {
        duration: 2000
      });
      return;
    }
    this.facilities.push(new FormControl('', [Validators.required,
    ApplicationValidator.uniqueFacility(this.facilities.value)]));
  }

  addSafety(): void {
    if (this.safeties.status == "INVALID") {
      this._bar.open('Please complete the above fields', 'OK', {
        duration: 2000
      });
      return;
    }
    this.safeties.push(new FormControl('', [Validators.required,
    ApplicationValidator.uniqueSafeties(this.safeties.value)]));
  }

  get nameErrors(): string {
    let name = this.auditoriumForm.get('name');
    if (name?.hasError('required'))
      return "Name cannot be empty";
    else if (name?.hasError('uniqueName'))
      return "Name already exists";
    return '';
  }

  get addressErrors(): string {
    let address = this.auditoriumForm.get('address');
    if (address?.hasError('required'))
      return 'Address cannot be empty';
    return '';
  }

  get emailErrors(): string {
    let email = this.auditoriumForm.get('email');
    if (email?.hasError('required'))
      return 'Email cannot be empty';
    return '';
  }

  get customerCareNoErrors(): string {
    let customerCareNo = this.auditoriumForm.get('customerCareNo');
    if (customerCareNo?.hasError('required'))
      return 'Customer Care cannot be empty';
    return '';
  }

  addShow(): void {
    if (this.shows.status == 'INVALID') {
      this._bar.open('Please complete the above fields', 'OK', {
        duration: 2000
      });
      return;
    }

    this.shows.push(new FormGroup({
      name: new FormControl('', [Validators.required, ApplicationValidator.uniqueShowName(this.shows.value)]),
      startTime: new FormControl('', [Validators.required, ApplicationValidator.uniqueShowTime(this.shows.value)])
    }));
  }

  removeFacility(index: number): void {
    if (confirm(`Do you want to remove the Facility: ${index + 1}`))
      this.facilities.removeAt(index);
  }

  removeSafety(index: number): void {
    if (confirm(`Do you want to remove the Safety: ${index + 1}`))
      this.safeties.removeAt(index);
  }

  removeShow(index: number): void {
    if (confirm(`Do you want to remove the show: ${index + 1}`))
      this.shows.removeAt(index);
  }

  onSubmit(): void {
    let message;
    this._service.addAuditorium(this.auditoriumForm.value)
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
        res => this._router.navigate(['./add-auditorium'])
      );
  }

}
