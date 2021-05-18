import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApplicationValidator } from 'src/app/classes/validator/application-validator';
import { Movie } from 'src/app/interfaces/application';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredGenres!: Observable<string[]>;
  genreField: FormControl = new FormControl();
  genres: string[] = ['Comedy'];
  allGenres: string[] = ['Comedy', 'Romance', 'Action', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller', 'Crime', 'War'];

  @ViewChild('genreInput') genreInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  movieData!: Movie;
  movieForm!: FormGroup;

  todayDate = new Date();

  constructor(private fb: FormBuilder, private bar: MatSnackBar) {
    this.filteredGenres = this.genreField.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => genre ? this._filter(genre) : this.allGenres.slice()));
  }

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        ApplicationValidator.uniqueMovieName
      ]),
      release: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      bgImage: new FormControl('', Validators.required),
      rating: new FormControl(''),
      story: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      // genres: new FormArray([new FormControl('', Validators.required)]),
      genreField: this.genreField,
      languages: new FormArray([new FormControl('', Validators.required)]),
      casts: new FormArray([new FormGroup({
        name: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required)
      })]),
      crews: new FormArray([new FormGroup({
        name: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required)
      })])
    });
  }

  addGenre(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    let canAdd: boolean = true;
    // Add our genre
    if (!value) {
      canAdd = false;
      this.bar.open('Cannot add empty value', 'OK', { duration: 2000 });
    }
    if (this.genres.find(genre => genre.toLowerCase() == value.toLowerCase())) {
      canAdd = false;
      this.bar.open('Genre already added', 'OK', { duration: 2000 });
    }
    if (!this.allGenres.find(genre => genre.toLowerCase() == value.toLowerCase())) {
      canAdd = false;
      this.bar.open('Unknown genre. Please select genres from the list', 'OK', { duration: 2000 });
    }

    if (canAdd)
      this.genres.push(value);


    // Clear the input value
    // event.chipInput!.clear();
    event.input.value = '';

    this.genreField.setValue(null);
  }

  removeGenre(genre: string): void {
    if (!(this.genres.length <= 1)) {
      const index = this.genres.indexOf(genre);

      if (index >= 0) {
        this.genres.splice(index, 1);
      }
    }
    else
      this.bar.open('At least one Genre must be provided', 'OK', { duration: 2000 });
  }

  selectedGenre(event: MatAutocompleteSelectedEvent): void {
    if (this.allGenres.find(genre => genre.toLowerCase() == event.option.viewValue.toLowerCase())) {
      if (!this.genres.find(genre => genre.toLowerCase() == event.option.viewValue.toLowerCase())) {
        this.genres.push(event.option.viewValue);
        this.genreInput.nativeElement.value = '';
        this.genreField.setValue(null);
      } else
        this.bar.open('Genre already added', 'OK', { duration: 2000 });
    } else
      this.bar.open('Unknown genre. Please select genres from the list', 'OK', { duration: 2000 });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGenres.filter(genre => genre.toLowerCase().indexOf(filterValue) === 0);
  }

  get validMovieDetails(): AbstractControl {
    const movie = this.movieForm;
    return (movie.get('name')! && movie.get('release')! && movie.get('image')! &&
      movie.get('bgImage')! && movie.get('story')! && movie.get('duration')!);
  };

  get nameErrors(): string {
    let name = this.movieForm.get('name');
    if (name?.hasError('required'))
      return 'Name cannot be null';
    else if (name?.hasError('uniqueName'))
      return 'Movie name already exists';
    return '';
  }

  get releaseErrors(): string {
    let release = this.movieForm.get('release');
    if (release?.hasError('required'))
      return 'Release Date cannot be null';
    return '';
  }

  get storyErrors(): string {
    let story = this.movieForm.get('story');
    if (story?.hasError('required'))
      return 'Story cannot be null';
    return '';
  }

  get durationErrors(): string {
    let duration = this.movieForm.get('duration');
    if (duration?.hasError('required'))
      return 'Duration cannot be null';
    return '';
  }

  get imageErrors(): string {
    let image = this.movieForm.get('image');
    if (image?.hasError('required'))
      return 'Image field cannot be null';
    return '';
  }

  get bgImageErrors(): string {
    let bgImage = this.movieForm.get('bgImage');
    if (bgImage?.hasError('required'))
      return 'Background Image cannot be null';
    return '';
  }

  get genre(): FormArray {
    return this.movieForm.get('genres') as FormArray;
  }

  get languages(): FormArray {
    return this.movieForm.get('languages') as FormArray;
  }

  get crews(): FormArray {
    return this.movieForm.get('crews') as FormArray;
  }

  get casts(): FormArray {
    return this.movieForm.get('casts') as FormArray;
  }

  // addGenre(): void {
  //   if (this.genres.status == "INVALID") {
  //     this.bar.open('Please complete the above fields first', 'OK', { duration: 2000 });
  //     return;
  //   }
  //   this.genres.push(new FormControl('', Validators.required));
  // }

  // removeGenre(index: number): void {
  //   if (this.genres.length <= 1) {
  //     this.bar.open('At least one Genre must be provided', 'OK', { duration: 2000 });
  //     return
  //   }
  //   if (confirm('Do you want to remove the Genre?'))
  //     this.genres.removeAt(index);
  // }

  addLanguage(): void {
    if (this.languages.status == "INVALID") {
      this.bar.open('Please complete the above fields first', 'OK', { duration: 2000 });
      return;
    }
    this.languages.push(new FormControl('', Validators.required));
  }

  removeLanguage(index: number): void {
    if (this.languages.length <= 1) {
      this.bar.open('At least one language must be provided', 'OK', { duration: 2000 });
      return
    }
    if (confirm('Do you want to remove the Language?'))
      this.languages.removeAt(index);
  }

  addCrew(): void {
    if (this.crews.status == "INVALID") {
      this.bar.open('Please complete the above fields first', 'OK', { duration: 2000 });
      return;
    }
    this.crews.push(new FormGroup({
      name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    }));
  }

  removeCrew(index: number): void {
    if (this.crews.length <= 1) {
      this.bar.open('At least one Crew details must be provided', 'OK', { duration: 2000 });
      return
    }
    if (confirm('Do you want to remove the Crew?'))
      this.crews.removeAt(index);
  }

  addCast(): void {
    if (this.casts.status == "INVALID") {
      this.bar.open('Please complete the above fields first', 'OK', { duration: 2000 });
      return;
    }
    this.casts.push(new FormGroup({
      name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    }));
  }

  removeCast(index: number): void {
    if (this.casts.length <= 1) {
      this.bar.open('At least one Cast details must be provided', 'OK', { duration: 2000 });
      return
    }
    if (confirm('Do you want to remove the Cast?'))
      this.casts.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.movieForm.value);

  }
}
