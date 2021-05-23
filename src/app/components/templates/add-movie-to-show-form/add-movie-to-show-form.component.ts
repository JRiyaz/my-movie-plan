import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Util } from 'src/app/classes/util/util';
import { Movie, MovieShow, TempAddMovieToShow } from 'src/app/interfaces/application';
import { ShowFormComponent } from '../show-form/show-form.component';

@Component({
  selector: 'app-add-movie-to-show-form',
  templateUrl: './add-movie-to-show-form.component.html',
  styleUrls: ['./add-movie-to-show-form.component.css'],
})
export class AddMovieToShowFormComponent implements OnInit {

  movieShowForm!: FormGroup;
  movieId = new FormControl('', [
    Validators.required,
    uniqueName(this._data.show.movieShows),
  ]);

  filteredMovies: Observable<Movie[]>;

  range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  startDate!: Date;

  endDate!: Date;

  sorteMovieShows!: MovieShow[];

  tempEndDate!: Date;

  movies!: Movie[];

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialogRef<ShowFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this._dialog.disableClose = true;

    this.filteredMovies = this.movieId.valueChanges.pipe(
      startWith(''),
      map((movie) => (movie ? this._filterMovies(movie) : this.movies.slice()))
    );
  }

  ngOnInit(): void {
    this.movieShowForm = this._fb.group({
      movieId: this.movieId,
      range: this.range,
      gold: new FormControl('', Validators.required),
      silver: new FormControl('', Validators.required),
      general: new FormControl('', Validators.required),
    });

    this.movies = this._data.movies;

    this.sorteMovieShows = this._data.show
      .movieShows
      .sort((date1: MovieShow, date2: MovieShow) => Util.sortByDates(date1.end, date2.end));

    this.tempEndDate = this.sorteMovieShows.reverse()[0].end!;
  }

  get movieIdErrors(): string {
    if (this.movieId.hasError('required'))
      return 'Please select a movie';
    else if (this.movieId.hasError('uniqueName'))
      return 'Movie is already screening on this show. select different move';
    return '';
  }

  get startDateErrors(): string {
    let start = this.range.get('start');
    if (start?.hasError('required'))
      return 'Start Date cannot be empty';
    return '';
  }

  get endDateErrors(): string {
    let end = this.range.get('end');
    if (end?.hasError('required'))
      return 'End date cannot be empty';
    return '';
  }

  get goldPriceErrors(): string {
    let gold = this.movieShowForm.get('gold');
    if (gold?.hasError('required'))
      return 'Gold section price cannot be empty';
    return '';
  }

  get silverPriceErrors(): string {
    let silver = this.movieShowForm.get('silver');
    if (silver?.hasError('required'))
      return 'Silver section price cannot be empty';
    return '';
  }

  get generalPriceErrors(): string {
    let general = this.movieShowForm.get('general');
    if (general?.hasError('required'))
      return 'General section price cannot be empty';
    return '';
  }

  private _filterMovies(value: number): Movie[] {
    return this.movies.filter((movie) => movie.id == value);
  }

  onMovieChange(event: any): void {
    const releaseDate: Date = this._data.movies
      .find((movie: { id: number }) => movie.id == event.value)
      .release!;

    this.startDate = this.tempEndDate > releaseDate ? this.tempEndDate : releaseDate;
    if (!this.startDate)
      this.startDate = new Date();
  }

  formatDate(date: any): string {
    return Util.formatDate(date);
  }

  onCancel(): void {
    this._dialog.close();
  }

  onSubmit(): void {
    const values = this.movieShowForm.value;
    const movieShow: TempAddMovieToShow = {
      movieId: values.movieId,
      start: values.range.start,
      end: values.range.end,
      price: {
        gold: values.gold,
        silver: values.silver,
        general: values.general,
      },
    };
    this._dialog.close({ movieShow: movieShow });
  }
}

function uniqueName(movieShows: MovieShow[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return movieShows?.find(mShow => mShow.id == control.value)
      ? { uniqueName: true }
      : null;
  };
}
