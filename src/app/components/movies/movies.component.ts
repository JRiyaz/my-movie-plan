import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Util } from 'src/app/classes/util/util';
import { GlobalConstants } from 'src/app/commons/global-constants';
import { Movie } from 'src/app/interfaces/application';
import { ApplicationService } from 'src/app/services/application/application.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MoviesComponent implements OnInit {


  showText = 'Now Playing';

  allLanguages: string[] = [];

  allGenres: string[] = [];

  search?: string;

  genreFilter?: string;

  languageFilter?: string;

  types = [
    'Now Playing',
    'Up Coming',
  ]

  movies!: Movie[];
  moviesList = new BehaviorSubject<Movie[]>(this.movies);
  moviesList$ = this.moviesList.asObservable();


  constructor(private _appService: ApplicationService,
    private _activeRoute: ActivatedRoute,
    private _router: Router) {
  }

  ngOnInit(): void {

    this._activeRoute.queryParams
      .subscribe(param => {
        const show = param['show'];
        if (show && show == 'up-coming') {
          this.showText = 'Up Coming';
          this._appService.getAllUpComingMovies().subscribe(movies => this.moviesList.next(movies ? movies : this.movies));
        }
        else
          this._appService.getAllNowPlayingMovies().subscribe(movies => this.moviesList.next(movies));
      });

    this.allLanguages = GlobalConstants.ALL_LANGUAGES;
    this.allGenres = GlobalConstants.ALL_GENERS;
  }

  onTypeChange(type: string): void {
    if (!(type == this.showText)) {
      const show = type == "Now Playing" ? 'now-playing' : 'up-coming'
      this._router.navigate(['../movies'], { queryParams: { 'show': show } });
    }
  }

  handleLanguageChange(language: string): void {
    if (language && language != this.languageFilter)
      this.languageFilter = language;
  }

  handleGenreChange(genre: string): void {
    if (genre && genre != this.genreFilter)
      this.genreFilter = genre;
  }

  clearLanguageFilter(): void {
    this.languageFilter = '';
  }

  clearGenreFilter(): void {
    this.genreFilter = '';
  }

  formatRelease(release: any): string {
    if (new Date(release) > new Date())
      return 'Releasing on ' + Util.formatDate(release);
    return 'Now Playing';
  }

}

