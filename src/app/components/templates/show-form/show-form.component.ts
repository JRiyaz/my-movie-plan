import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationValidator } from 'src/app/classes/validators/application-validator';
import { GlobalConstants } from 'src/app/commons/global-constants';
import { Show } from 'src/app/interfaces/application';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})
export class ShowFormComponent implements OnInit {

  showForm!: FormGroup;

  auditoriumShows!: Show[];

  showNames = GlobalConstants.SHOW_NAMES;

  constructor(private _fb: FormBuilder,
    public _dialog: MatDialogRef<ShowFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: Show[]) {
    this._dialog.disableClose = true;
  }

  ngOnInit(): void {
    this.auditoriumShows = this._data;
    this.showForm = this._fb.group({
      name: new FormControl('', [Validators.required, uniqueName(this.auditoriumShows)]),
      startTime: new FormControl('', [Validators.required, ApplicationValidator.uniqueShowTime(this.auditoriumShows)])
    });
  }

  get nameErrors(): string {
    let name = this.showForm.get('name');
    if (name?.hasError('required'))
      return 'Name cannot be null';
    else if (name?.hasError('uniqueName'))
      return 'Show name must be unique';
    return '';
  }

  get startTimeErrors(): string {
    let time = this.showForm.get('startTime');
    if (time?.hasError('required'))
      return 'Time cannot be null';
    else if (time?.hasError('uniqueTime'))
      return 'Time gap between the shows must be at-least 3 hours';
    return '';
  }

  onCancel(): void {
    this._dialog.close();
  }
  onSubmit(): void {
    this._dialog.close({ show: this.showForm.value });
  }
}

// https://www.infragistics.com/community/blogs/b/infragistics/posts/how-to-create-custom-validators-for-angular-reactive-forms
function uniqueName(shows: Show[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return shows ? shows.find(show => show.name.toLocaleLowerCase() == control.value.toLocaleLowerCase())
      ? { 'uniqueName': true }
      : null : null;
  };
}