import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Auditorium, Movie, MovieShow, Show, TempSelectMembers } from 'src/app/interfaces/application';

@Component({
  selector: 'app-select-members',
  templateUrl: './select-members.component.html',
  styleUrls: ['./select-members.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SelectMembersComponent implements OnInit {

  tempAuditoriums!: Auditorium[];
  tempAuditoriumId!: number;
  tempShowId!: number;
  tempShows!: Show[];
  selectedMovie!: Movie;
  // tempShowTime: string = this.tempShows[0].time;
  tempShowTime!: string;
  tempNoOfSeatsAvaliable!: number[];
  templateSelectedSeats!: number;
  // tempNoOfSeatsAvaliable: number[] = this.resolveArray(this.tempShows[0].seats);
  noOfSeats!: number;
  // noOfSeats: number = this.tempNoOfSeatsAvaliable[0];
  ticketsForm!: FormGroup;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public _data: any,
    private _sheet: MatBottomSheet,
    private _fb: FormBuilder) {
    // this._sheet._openedBottomSheetRef?.disableClose = true;
  }

  ngOnInit(): void {
    this.ticketsForm = this._fb.group({
      auditorium: new FormControl(this.tempAuditoriumId, Validators.required),
      showTime: new FormControl('', Validators.required),
      seat: new FormControl('', Validators.required)
    });

    this.tempAuditoriums = this._data!.auditoriums;
    this.tempAuditoriumId = this.tempAuditoriums[0].id!;
    // this.tempShows = this.tempAuditoriums.find(hall => hall.id == this.tempAuditoriumId)?.shows!;

    this.selectedMovie = this._data.movie;
  }

  resolveArray(seats: number): number[] {
    if (seats > 5)
      return [...Array(6).keys()].filter(num => num > 0);
    else if (seats > 0 && seats < 5)
      return [...Array(seats + 1).keys()].filter(num => num > 0);
    else
      return new Array<number>();
  }

  onAuditoriumSelect(hallId: number): void {

    if (hallId != this.tempAuditoriumId) {
      this.tempAuditoriumId = hallId;

      this.tempShows = this.tempAuditoriums.find(hall => hall.id == hallId)?.shows
        .filter(show => show.movieShows?.filter(mShow => mShow.movie?.id == this.selectedMovie.id))!;

      this.tempShowId = this.tempShows[0].id!;

      // this.ticketsForm.setControl('time', new FormControl(this.tempShows[0].id, Validators.required));
    }
  }

  onTimingSelect(showId: number): void {
    if (showId != this.tempShowId) {
      this.tempShowId = showId;
      const movieShow: MovieShow = this.tempShows.find(show => show.id == showId)?.movieShows?.find(mShow => mShow.movie?.id == this.selectedMovie.id)!;
      this.tempNoOfSeatsAvaliable = this.resolveArray(movieShow?.avalibleSeats!);
      this.templateSelectedSeats = this.tempNoOfSeatsAvaliable[0];
      // this.ticketsForm.setControl('seat', new FormControl(this.tempNoOfSeatsAvaliable[0], Validators.required));
    }
  }

  get auditoriumErrors(): string {
    let auditorium = this.ticketsForm.get('auditorium');
    if (auditorium?.hasError('require'))
      return 'Please select the Cinema Hall';
    return '';
  }

  get timingErrors(): string {
    let timing = this.ticketsForm.get('showTime');
    if (timing?.hasError('required'))
      return 'Please select the timing';
    return '';
  }

  get icon(): string {
    let seats = this.templateSelectedSeats;
    if (seats == 1)
      return 'directions_bike';
    else if (seats == 2)
      return 'two_wheeler';
    else if (seats == 3)
      return 'electric_rickshaw';
    else if (seats == 4)
      return 'time_to_leave';
    else if (seats == 5)
      return 'airport_shuttle';
    return 'error';
  }

  get templateGetAuditoriumName(): string {
    return this.tempAuditoriums.find(hall => hall.id == this.tempAuditoriumId)?.name!;
  }

  get templateGetShowNameAndTiming(): string {
    const show: Show = this.tempShows.find(show => show.id == this.tempShowId)!;
    const showName = show.name;
    const showTiming = show.startTime;
    return `Show: ${showName} Time: ${showTiming}`;
  }

  proceed(): void {
    const res: TempSelectMembers = {
      auditoriumId: this.tempAuditoriumId,
      showId: this.tempShowId,
      seats: this.templateSelectedSeats
    }
    this._sheet.dismiss({ data: res });
  }
}

