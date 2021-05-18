import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationValidator } from 'src/app/classes/validator/application-validator';
import { Auditorium } from 'src/app/interfaces/application';

@Component({
  selector: 'app-auditorium-form',
  templateUrl: './auditorium-form.component.html',
  styleUrls: ['./auditorium-form.component.css']
})
export class AuditoriumFormComponent implements OnInit {

  auditoriumData!: Auditorium;
  auditoriumForm!: FormGroup;

  constructor(private fb: FormBuilder, private bar: MatSnackBar) { }

  ngOnInit(): void {
    this.auditoriumForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        ApplicationValidator.uniqueAuditoriumName
      ]),
      image: new FormControl(''),
      email: new FormControl('', Validators.required),
      customerCare: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      seatCapacity: new FormControl(150, Validators.required),
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
      this.bar.open('Please complete the above fields', 'OK', {
        duration: 2000
      });
      return;
    }
    this.facilities.push(new FormControl('', [Validators.required,
    ApplicationValidator.uniqueFacility(this.facilities.value)]));
  }

  addSafety(): void {
    if (this.safeties.status == "INVALID") {
      this.bar.open('Please complete the above fields', 'OK', {
        duration: 2000
      });
      return;
    }
    this.safeties.push(new FormControl('', Validators.required));
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

  get customerCareErrors(): string {
    let customerCare = this.auditoriumForm.get('customerCare');
    if (customerCare?.hasError('required'))
      return 'Customer Care cannot be empty';
    return '';
  }

  // get facilityErrors(): string {
  //   let customerCare = this.auditoriumForm.get('facilities');
  //   if (customerCare?.hasError('uniqueName'))
  //     return 'Facility already added';
  //   return '';
  // }

  addShow(): void {
    if (this.shows.status == 'INVALID') {
      this.bar.open('Please complete the above fields', 'OK', {
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
    console.log(this.auditoriumForm.value);

    this.auditoriumData = this.auditoriumForm.value;
  }

}
