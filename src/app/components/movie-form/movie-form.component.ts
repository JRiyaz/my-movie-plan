import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApplicationValidator } from 'src/app/classes/validators/application-validator';
import { GlobalConstants } from 'src/app/commons/global-constants';
import { LeaveForm, Movie } from 'src/app/interfaces/application';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApplicationService } from 'src/app/services/application/application.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [ApplicationValidator]
})
export class MovieFormComponent implements OnInit, LeaveForm {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredLanguages!: Observable<string[]>;
  languageField: FormControl = new FormControl();
  languages: string[] = ['English'];
  allLanguages!: string[];

  allGenres!: string[];

  @ViewChild('languageInput') languageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  movieForm!: FormGroup;

  todayDate = new Date();

  allMovieNames!: string[];

  constructor(private _fb: FormBuilder,
    private _service: ApplicationService,
    private _router: Router,
    private _globalService: GlobalService,
    private _alertService: AlertService) {

    this.filteredLanguages = this.languageField.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => genre ? this._filter(genre) : this.allLanguages.slice()));
  }

  areYouSure(): boolean {
    return confirm('Are you sure to leave the page?');
  }

  ngOnInit(): void {
    this._globalService.getMovieNames()
      .subscribe(movieNames => this.allMovieNames = movieNames);

    this.allLanguages = GlobalConstants.ALL_LANGUAGES;
    this.allGenres = GlobalConstants.ALL_GENERS;

    this.movieForm = this._fb.group({
      name: new FormControl('', [
        Validators.required,
        ApplicationValidator.uniqueMovieName(this.allMovieNames)
      ]),
      release: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      bgImage: new FormControl('', Validators.required),
      caption: new FormControl(''),
      story: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      // genres: new FormArray([new FormControl('', Validators.required)]),
      languages: this.languageField,
      genres: new FormArray([new FormControl('', [Validators.required,
      ApplicationValidator.validMovieGenre(this.allGenres)]
      )]),
      casts: new FormArray([new FormGroup({
        isCast: new FormControl('yes'),
        name: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required)
      })]),
      crews: new FormArray([new FormGroup({
        isCast: new FormControl('no'),
        name: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required)
      })])
    });
  }

  addLanguage(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    let canAdd: boolean = true;
    // Add our genre
    if (!value) {
      canAdd = false;
      this._alertService.defaultAlert('Cannot add empty value');
    }
    if (this.languages.find(language => language.toLowerCase() == value.toLowerCase())) {
      canAdd = false;
      this._alertService.defaultAlert('Language already added');
    }
    if (!this.allLanguages.find(language => language.toLowerCase() == value.toLowerCase())) {
      canAdd = false;
      this._alertService.defaultAlert('Unknown language. Please select language from the list');
    }

    if (canAdd)
      this.languages.push(value);


    // Clear the input value
    // event.chipInput!.clear();
    event.input.value = '';

    this.languageField.setValue(null);
  }

  removeLanguage(genre: string): void {
    if (!(this.languages.length <= 1)) {
      const index = this.languages.indexOf(genre);
      if (index >= 0) {
        this.languages.splice(index, 1);
      }
    }
    else
      this._alertService.defaultAlert('At least one Language must be provided');
  }

  selectedLanguage(event: MatAutocompleteSelectedEvent): void {
    if (this.allLanguages.find(language => language.toLowerCase() == event.option.viewValue.toLowerCase())) {
      if (!this.languages.find(language => language.toLowerCase() == event.option.viewValue.toLowerCase())) {
        this.languages.push(event.option.viewValue);
        this.languageInput.nativeElement.value = '';
        this.languageField.setValue(null);
      } else
        this._alertService.defaultAlert('Language already added');
    } else
      this._alertService.defaultAlert('Unknown language. Please select language from the list');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLanguages.filter(language => language.toLowerCase().indexOf(filterValue) === 0);
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

  get genres(): FormArray {
    return this.movieForm.get('genres') as FormArray;
  }

  get crews(): FormArray {
    return this.movieForm.get('crews') as FormArray;
  }

  get casts(): FormArray {
    return this.movieForm.get('casts') as FormArray;
  }

  addGenre(): void {
    if (this.genres.status == "INVALID") {
      this._alertService.defaultAlert('Please complete the above fields first');
      return;
    }
    this.genres.push(new FormControl('', [Validators.required,
    ApplicationValidator.validMovieGenre(this.allGenres),
    ApplicationValidator.uniqueFacility(this.genres.value)]));
  }

  removeGenre(index: number): void {
    if (this.genres.length <= 1) {
      this._alertService.defaultAlert('At least one Genre must be provided');
      return
    }
    if (confirm('Do you want to remove the Genre?'))
      this.genres.removeAt(index);
  }

  // addLanguage(): void {
  //   if (this.languages.status == "INVALID") {
  //     this._alertService.defaultAlert('Please complete the above fields first');
  //     return;
  //   }
  //   this.languages.push(new FormControl('', [Validators.required, this._validator.validMovieLanguage]));
  // }

  // removeLanguage(index: number): void {
  //   if (this.languages.length <= 1) {
  //     this._alertService.defaultAlert('At least one language must be provided');
  //     // this._bar.open('At least one language must be provided', 'OK', { duration: 3000 });
  //     return
  //   }
  //   if (confirm('Do you want to remove the Language?'))
  //     this.languages.removeAt(index);
  // }

  addCrew(): void {
    if (this.crews.status == "INVALID") {
      this._alertService.defaultAlert('Please complete the above fields first');
      return;
    }
    this.crews.push(new FormGroup({
      isCast: new FormControl('no'),
      name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    }));
  }

  removeCrew(index: number): void {
    if (this.crews.length <= 1) {
      this._alertService.defaultAlert('At least one Crew details must be provided');
      return
    }
    if (confirm('Do you want to remove the Crew?'))
      this.crews.removeAt(index);
  }

  addCast(): void {
    if (this.casts.status == "INVALID") {
      this._alertService.defaultAlert('Please complete the above fields first');
      return;
    }
    this.casts.push(new FormGroup({
      isCast: new FormControl('yes'),
      name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    }));
  }

  removeCast(index: number): void {
    if (this.casts.length <= 1) {
      this._alertService.defaultAlert('At least one Cast details must be provided');
      return
    }
    if (confirm('Do you want to remove the Cast?'))
      this.casts.removeAt(index);
  }

  onSubmit(): void {
    let count = 0;
    const movie: Movie = this.movieForm.value;
    movie.addedOn = new Date();
    movie.year = movie.release?.getFullYear().toString();
    this.languages.forEach(language => {
      movie.language = language;
      this._service.addMovie(movie)
        .subscribe(
          res => this._globalService.addMovie(res),
          err => this._alertService.postionAlert(err.error.message, 'danger-alert')
        );
      count++;
    });
    if (count >= this.languages.length)
      this._router.navigate(['/admin/manage'], { queryParams: { 'movie-added': true } });
  }
}

// function uniqueMovieName(movieNames: string[]): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: boolean } | null => {
//     return movieNames ? movieNames
//       .find(name => name.toLowerCase() == control.value.toLowerCase())
//       ? { 'uniqueName': true }
//       : null : null;
//   };
// }