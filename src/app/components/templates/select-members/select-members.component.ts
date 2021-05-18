import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Auditorium, Show } from 'src/app/interfaces/application';

@Component({
  selector: 'app-select-members',
  templateUrl: './select-members.component.html',
  styleUrls: ['./select-members.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SelectMembersComponent {

  // constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: Auditorium[],
  //   private sheet: MatBottomSheet,
  //   private fb: FormBuilder) { }

  // tempAuditorium: string = this.data[0].name;
  // tempShows: Show[] = this.data.find(audi => audi.name == this.tempAuditorium)?.shows!
  // tempTime: string = this.tempShows[0].time;
  // tempSeats: number[] = this.resolveArray(this.tempShows[0].seats);

  // people: number = this.tempSeats[0];

  // resolveArray(seats: number): number[] {
  //   if (seats > 5)
  //     return [...Array(6).keys()].filter(num => num > 0);
  //   else if (seats > 0 && seats < 5)
  //     return [...Array(seats + 1).keys()].filter(num => num > 0);
  //   else
  //     return new Array<number>();
  // }


  // ticketsForm: FormGroup = this.fb.group({
  //   auditorium: new FormControl(this.tempAuditorium, Validators.required),
  //   time: new FormControl(this.tempTime, Validators.required),
  //   seat: new FormControl(this.tempSeats[0], Validators.required)
  // })

  // onAuditoriumSelect(): void {
  //   let newAuditorium = this.ticketsForm.get('auditorium')?.value;
  //   console.log(newAuditorium);

  //   if (newAuditorium != this.tempAuditorium) {
  //     this.tempAuditorium = newAuditorium;
  //     this.tempShows = this.data.find(audi => audi.name == newAuditorium)?.shows!
  //     this.ticketsForm.setControl('time', new FormControl(this.tempShows[0].time, Validators.required));
  //   }
  // }

  // onTimingSelect(): void {
  //   let newtime = this.ticketsForm.get('time')?.value;
  //   if (newtime != this.tempTime) {
  //     this.tempTime = newtime;
  //     this.tempSeats = this.resolveArray(this.tempShows.find(show => show.time == newtime)?.seats!);
  //     this.ticketsForm.setControl('seat', new FormControl(this.tempSeats[0], Validators.required));
  //   }
  // }

  // get auditoriumErrors(): string {
  //   let auditorium = this.ticketsForm.get('auditorium');
  //   if (auditorium?.hasError('require'))
  //     return 'Please select the Cinema Hall';
  //   return '';
  // }

  // get timingErrors(): string {
  //   let timing = this.ticketsForm.get('timing');
  //   if (timing?.hasError('required'))
  //     return 'Please select the timing';
  //   return '';
  // }

  // get getSeats(): number {
  //   return this.ticketsForm.get('seat')?.value;
  // }

  // get icon(): string {
  //   let seats = this.getSeats;
  //   if (seats == 1)
  //     return 'directions_bike';
  //   else if (seats == 2)
  //     return 'two_wheeler';
  //   else if (seats == 3)
  //     return 'electric_rickshaw';
  //   else if (seats == 4)
  //     return 'time_to_leave';
  //   else if (seats == 5)
  //     return 'airport_shuttle';
  //   return 'error';
  // }

  // proceed(): void {
  //   this.sheet.dismiss({ data: this.ticketsForm.value });
  // }
}

