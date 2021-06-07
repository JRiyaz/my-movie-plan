import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from 'src/app/classes/util/util';
import { Auditorium, Movie, MovieShow, Show } from 'src/app/interfaces/application';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApplicationService } from 'src/app/services/application/application.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { AddMovieToShowFormComponent } from '../templates/add-movie-to-show-form/add-movie-to-show-form.component';
import { ShowFormComponent } from '../templates/show-form/show-form.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {


  allAuditoriums!: Auditorium[];

  allMovies!: Movie[];

  selectedCinemaHallId!: number;

  selectedShowId!: number;

  selectedShows!: Show[];

  selectedMovieShows!: MovieShow[];

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _service: ApplicationService,
    private _globalService: GlobalService,
    private _alertService: AlertService,
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._globalService.getAllAuditoriums()
      .subscribe(halls => this.allAuditoriums = halls);
    this._globalService.getAllMovies()
      .subscribe(movies => this.allMovies = movies);

    this._activeRoute.queryParams
      .subscribe(param => {
        if (param['movie-added'])
          this._alertService.postionAlert('Movie Added');
        else if (param['auditorium-added'])
          this._alertService.postionAlert('Auditorium Added');
        // else if (param['show-added'])
        //   this._alertService.postionAlert('Show Added');
        // else if (param['movie-show-added'])
        //   this._alertService.postionAlert('Movie Show Added');
      });
  }

  onCinemaHallSelect(auditoriumId: number): void {
    this.selectedCinemaHallId = auditoriumId;
    this.selectedShows = this.allAuditoriums.find(
      (hall) => hall.id == auditoriumId
    )?.shows!;
    this.selectedShowId = 0;
    this.selectedMovieShows = [];
  }

  onShowSelect(showId: number): void {
    this.selectedShowId = showId;

    this.selectedMovieShows = this.selectedShows.find((show) => show.id == showId)
      ?.movieShows!;
  }

  getShowMovieName(movieId: number): string {
    return this.allMovies.find(movie => movie.id == movieId)?.name!;
  }
  getShowMovieLanguage(movieId: number): string {
    return this.allMovies.find(movie => movie.id == movieId)?.language!;
  }

  getMovieImage(movieId: number): string {
    return this.allMovies.find(movie => movie.id == movieId)?.image!;
  }

  onAddCinemaHall(): void {
    this._router.navigate(['./add-auditorium']);
  }

  onAddMovie(): void {
    this._router.navigate(['./add-movie']);
  }


  onAddShow(): void {
    const dialog = this._dialog.open(ShowFormComponent, {
      width: '80%',
      data: this.selectedShows
    })

    dialog.afterClosed().subscribe(result => {
      if (result?.show) {
        this._service.addShow(this.selectedCinemaHallId, result.show)
          .subscribe(
            res => {
              this._globalService.addShow(this.selectedCinemaHallId, res)
              this._alertService.postionAlert('Show Added');
              // this.selectedShows.push(res);
            },
            err => this._alertService.postionAlert(err.error.message, 'danger-alert')
          );
      }
    },
      (error) => console.log(error)
    );

  }

  onAddMovieToTheShow(): void {
    const movieShows = this.selectedShows.
      find(show => show.id == this.selectedShowId)?.movieShows;
    const dialog = this._dialog.open(AddMovieToShowFormComponent, {
      width: '90%',
      data: {
        shows: movieShows,
        movies: this.allMovies
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result?.movieShow) {
        this._service.addMovieShow(this.selectedCinemaHallId, this.selectedShowId, result.movieShow)
          .subscribe(
            res => {
              if (res) {
                this._globalService.addMovieShows(this.selectedCinemaHallId, this.selectedShowId, res);
                this._alertService.postionAlert('Movie Show Added');
              }
              // this.selectedShows.find(show => show.id == this.selectedShowId)?.movieShows?.push(res);
            },
            err => this._alertService.postionAlert(err.error.message, 'danger-alert')
          );
      }
    })
  }

  formatTime(time: string): string {
    return Util.formatTimeToAmOrPm(time);
  }

  onEditCinemaHall(auditoriumId: number): void {
    alert(`edit ${auditoriumId}`);
  }

  onDeleteCinemaHall(auditoriumId: number): void {
    alert(`delete ${auditoriumId}`);
  }

  onEditShow(showId: number): void {
    alert(`edit show ${showId}`);
  }

  onDeleteShow(showId: number): void {
    alert(`delete show: ${showId}`);
  }

  onEditMovie(movieId: number): void {
    alert(`edit movie ${movieId}`);
  }

  onDeleteMovie(movieId: number): void {
    alert(`delete movie ${movieId}`);
  }
}
