import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationValidator } from 'src/app/classes/validators/application-validator';
import { GlobalConstants } from 'src/app/commons/global-constants';
import { LeaveForm } from 'src/app/interfaces/application';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApplicationService } from 'src/app/services/application/application.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-auditorium-form',
  templateUrl: './auditorium-form.component.html',
  styleUrls: ['./auditorium-form.component.css']
})
export class AuditoriumFormComponent implements OnInit, LeaveForm {

  auditoriumForm!: FormGroup;
  allAuditoriumNames!: string[];
  allFacilities!: string[];
  allSafeties!: string[];
  showNames = GlobalConstants.SHOW_NAMES;

  constructor(private _fb: FormBuilder,
    private _alertService: AlertService,
    private _service: ApplicationService,
    private _router: Router,
    private _globalService: GlobalService) { }

  areYouSure(): boolean {
    return confirm('Are you sure to leave the page?');
  }

  ngOnInit(): void {
    this._globalService.getAuditoriumNames()
      .subscribe(halls => this.allAuditoriumNames = halls);

    this.allFacilities = GlobalConstants.HALL_FACILITIES;
    this.allSafeties = GlobalConstants.HALL_SAFETIES;

    this.auditoriumForm = this._fb.group({
      name: new FormControl('', [
        Validators.required,
        uniqueAuditoriumName(this.allAuditoriumNames)
      ]),
      image: new FormControl(''),
      email: new FormControl('', Validators.required),
      customerCareNo: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      seatCapacity: new FormControl(100, Validators.required),
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
    if (this.facilities.status == "INVALID") {
      this._alertService.defaultAlert('Please complete the above fields');
      return;
    }
    this.facilities.push(new FormControl('', [Validators.required,
    ApplicationValidator.uniqueFacility(this.facilities.value)]));
  }

  addSafety(): void {
    if (this.safeties.status == "INVALID") {
      this._alertService.defaultAlert('Please complete the above fields');
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
      return "Auditorium already exists";
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
      this._alertService.defaultAlert('Please complete the above fields');
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
    this._service.addAuditorium(this.auditoriumForm.value)
      .subscribe(
        res => {
          this._globalService.addAuditorium(res);
          this._router.navigate(['/admin/manage'], { queryParams: { 'auditorium-added': true } });
        },
        err => this._alertService.postionAlert(err.error.message, 'danger-alert')
      );
  }

}

function uniqueAuditoriumName(auditoriumNames: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return auditoriumNames ? auditoriumNames
      .find(name => name.toLowerCase() == control.value.toLowerCase())
      ? { 'uniqueName': true }
      : null : null;
  };
}
