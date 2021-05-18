import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Util } from 'src/app/classes/util/util';
import { Movie, MovieShow, ShowMovie } from 'src/app/interfaces/application';
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
    uniqueName(this.data.show.movieShows),
  ]);
  filteredMovies: Observable<Movie[]>;
  range = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
  });

  startDate!: Date;
  endDate!: Date;

  sorteMovieShows!: MovieShow[];
  tempEndDate!: Date;

  movies: Movie[] = [
    {
      id: 1,
      name: 'Arkansas',
      release: new Date(),
      // release: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      image:
        'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
      addedOn: new Date(),
    },
    {
      id: 2,
      name: 'California',
      release: new Date(),
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      image:
        'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
      addedOn: new Date(),
    },
    {
      id: 3,
      name: 'Florida',
      release: new Date(),
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      image:
        'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
      addedOn: new Date(),
    },
    {
      id: 4,
      name: 'Texas',
      release: new Date(),
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      image:
        'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
      addedOn: new Date(),
    },
  ];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<ShowFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dialog.disableClose = true;
    this.filteredMovies = this.movieId.valueChanges.pipe(
      startWith(''),
      map((movie) => (movie ? this._filterMovies(movie) : this.movies.slice()))
    );
  }
  ngOnInit(): void {
    this.movieShowForm = this.fb.group({
      movieId: this.movieId,
      range: this.range,
      gold: new FormControl('', Validators.required),
      silver: new FormControl('', Validators.required),
      general: new FormControl('', Validators.required),
    });

    this.sorteMovieShows = this.data.show
      .movieShows
      .sort((date1: MovieShow, date2: MovieShow) => Util.sortDates(date1.to, date2.to));
    this.tempEndDate = this.sorteMovieShows.reverse()[0].to!;
  }

  get movieIdErrors(): string {
    if (this.movieId.hasError('required'))
      return 'Please select a movie';
    else if (this.movieId.hasError('uniqueName'))
      return 'Movie is already screening on this show. select different move';
    return '';
  }

  get fromDateErrors(): string {
    let from = this.range.get('from');
    if (from?.hasError('required'))
      return 'Start Date cannot be empty';
    return '';
  }

  get toDateErrors(): string {
    let to = this.range.get('to');
    if (to?.hasError('required'))
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

    const releaseDate: Date = this.data.movies.find(
      (movie: { id: number }) => movie.id == event.value
    ).release!;

    this.startDate = this.tempEndDate > releaseDate ? this.tempEndDate : releaseDate;
    if (!this.startDate)
      this.startDate = new Date();
  }

  formatDate(date: any): string {
    return Util.formatDate(date);
  }

  onCancel(): void {
    this.dialog.close();
  }

  onSubmit(): void {
    const values = this.movieShowForm.value;
    const show: ShowMovie = {
      movieId: values.movieId,
      from: values.range.from,
      to: values.range.to,
      prices: {
        gold: values.gold,
        silver: values.silver,
        general: values.general,
      },
    };
    // this.dialog.close({ show: this.selectedMovie });
    console.log(show);
  }
}

function uniqueName(movieShows: MovieShow[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return movieShows?.find(show => show.movieId == control.value)
      ? { uniqueName: true }
      : null;
  };
}
