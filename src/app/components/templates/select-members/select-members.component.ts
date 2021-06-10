import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Observable, of } from 'rxjs';
import { Util } from 'src/app/classes/util/util';
import { Auditorium, Movie, Show, TempSelectMembers } from 'src/app/interfaces/application';
import { ApplicationService } from 'src/app/services/application/application.service';
import { GlobalService } from 'src/app/services/global/global.service';

class SelectMembers implements TempSelectMembers {
  auditoriumId: number = 0;
  auditoriumName: string = '';
  showId: number = 0;
  showName: string = '';
  showTime: string = '';
  movieShowId: number = 0;
  bookedSeats: number = 0;
  bookedSeatNumbers: string[] = [];
  date: Date = new Date();
  movieName: string = '';
  movieId = 0;
  movieLanguage: string = '';
  seats: number = 0;

}

@Component({
  selector: 'app-select-members',
  templateUrl: './select-members.component.html',
  styleUrls: ['./select-members.component.css']
})
export class SelectMembersComponent implements OnInit {

  ticketsForm!: FormGroup;

  allAuditoriums$!: Observable<Auditorium[]>;

  allShows$!: Observable<Show[]>;

  startDate$!: Observable<Date>;

  endDate$!: Observable<Date>;

  avaliableSeats$ !: Observable<number[]>;

  // selectedMovieName!: string;

  selectedMovieId!: number;

  selectMembers!: TempSelectMembers;

  // selectedMovieLanguage!: string;

  // movieShowId!: number;

  // selectedShowTiming!: string;

  // selectedAuditoriumId!: number;

  // selectedShowId!: number;

  selectedSeats = 0;

  // bookedSeats!: number;

  // bookedSeatNumber!: string[];

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public _data: {
    movieId: number,
    movie: Observable<Movie>
  },
    private _sheet: MatBottomSheet,
    private _fb: FormBuilder,
    private _service: GlobalService,
    private _appService: ApplicationService) {
    // this._sheet._openedBottomSheetRef?.disableClose = true;
  }

  ngOnInit(): void {
    console.log(this._data.movie);
    console.log(this._data.movieId);

    this.selectMembers = new SelectMembers();

    this.allAuditoriums$ = this._appService.getAuditoriumsByMovieId(this._data.movieId);

    this._data.movie.subscribe(movie => {
      this.selectMembers.movieName = movie?.name!;
      this.selectMembers.movieLanguage = movie.language!;
      // this.selectedMovieName = movie.name!;
      // this.selectedMovieLanguage = movie.language!;
      this.selectedMovieId = movie.id!;
    });

    this.ticketsForm = this._fb.group({
      auditoriumName: new FormControl('', Validators.required),
      showName: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      seats: new FormControl('', Validators.required)
    });
  }

  resolveArray(seats: number): number[] {
    if (seats > 5)
      return [...Array(6).keys()].filter(num => num > 0);
    else if (seats > 0 && seats < 5)
      return [...Array(seats + 1).keys()].filter(num => num > 0);
    else
      return new Array<number>();
  }

  onAuditoriumSelect(hallId: number, hallName: string): void {

    if (hallName != this.ticketsForm.get('auditoriumName')?.value) {
      this.selectMembers.auditoriumId = hallId;
      this.selectMembers.auditoriumName = hallName;
      this.allShows$ = this._appService.getShowsByMovieId(hallId, this.selectedMovieId);
      this.ticketsForm.get('showName')?.reset;
    }
  }

  onShowSelect(showId: number, showName: string): void {
    if (showName != this.ticketsForm.get('showName')?.value) {
      // this.selectedShowId = showId;
      this.selectMembers.showId = showId;
      this.selectMembers.showName = showName;
      this.allShows$.subscribe(shows => {
        const show = shows.find(show => show.name == showName);
        const movieShow = show?.movieShows?.find(m_show => m_show.movieId == this.selectedMovieId);
        this.startDate$ = of((new Date(movieShow?.start!) < new Date()) ? new Date() : movieShow?.start!);
        this.endDate$ = of(movieShow?.end!);
        this.selectMembers.showTime = show?.startTime!;
        this.selectMembers.movieShowId = movieShow?.id!;
        this.selectMembers.movieId = this._data.movieId;
      })
      this.ticketsForm.get('date')?.reset;
    }
  }

  onDateSelect(event: any): void {
    const value = event?.target?.value;
    console.log(value);
    this._appService.getAllBookedSeats(this.selectMembers.movieShowId, value).subscribe(seats => {
      const count = this.resolveArray(100 - seats.count);
      this.avaliableSeats$ = of(count);
      this.selectedSeats = (count.length > 0 ? 1 : 0);
      this.selectMembers.bookedSeatNumbers = seats.seats;
      this.selectMembers.bookedSeats = seats.count;
    });
  }

  get auditoriumErrors(): string {
    let auditorium = this.ticketsForm.get('auditoriumId');
    if (auditorium?.hasError('require'))
      return 'Please select the Cinema Hall';
    return '';
  }

  get showErrors(): string {
    let timing = this.ticketsForm.get('showName');
    if (timing?.hasError('required'))
      return 'Please select the timing';
    return '';
  }

  get dateErrors(): string {
    if (this.ticketsForm.get('date')?.hasError('required'))
      return 'Please select the date';
    return '';
  }
  onSeatsChange(seat: number): void {
    this.selectedSeats = seat;
  }

  get icon(): string {
    let seats = this.selectedSeats;
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

  formatTime(time: string): string {
    return Util.formatTimeToAmOrPm(time);
  }

  proceed(): void {
    // const data: TempSelectMembers = this.ticketsForm.value;
    this.selectMembers.date = this.ticketsForm.get('date')?.value;
    this.selectMembers.seats = this.ticketsForm.get('seats')?.value;

    this._sheet.dismiss({ tempSelectMembers: this.selectMembers });
  }
}

