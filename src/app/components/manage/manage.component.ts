import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Auditorium, Movie, MovieShow, Show } from 'src/app/interfaces/application';
import { ApplicationService } from 'src/app/services/application/application.service';
import { AddMovieToShowFormComponent } from '../templates/add-movie-to-show-form/add-movie-to-show-form.component';
import { ShowFormComponent } from '../templates/show-form/show-form.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  constructor(
    private router: Router,
    private appService: ApplicationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  cinemaHalls: Auditorium[] = this.appService.auditoriums;

  selectedCinemaHall!: string;

  selectedShow!: string;

  selectedShows!: Show[];

  selectedMovies: Movie[] = []

  onCinemaHallSelect(auditorium: string): void {
    this.selectedCinemaHall = auditorium;
    this.selectedShows = this.cinemaHalls.find(
      (cinema) => cinema.name == auditorium
    )?.shows!;
    this.selectedShow = '';
    this.selectedMovies = [];
  }

  onShowSelect(showName: string): void {
    this.selectedShow = showName;
    const shows: MovieShow[] = this.selectedShows.find((show) => show.name == showName)
      ?.movieShows!;
    this.selectedMovies = this.appService.movies.filter((movie) =>
      shows.find((m_show) => m_show.movieId == movie.id)
    );
  }

  onAddCinemaHall(): void {
    this.router.navigate(['./add-auditorium']);
  }

  onAddMovie(): void {
    this.router.navigate(['./add-movie']);
  }

  onAddMovieToTheShow(): void {
    const dialog = this.dialog.open(AddMovieToShowFormComponent, {
      width: '50%',
      data: {
        show: this.selectedShows.
          find(show => show.name == this.selectedShow),
        movies: this.appService.movies
      }
    });
  }

  onAddShow(): void {
    const dialog = this.dialog.open(ShowFormComponent, {
      width: '50%',
      data: this.selectedShows
    })

    dialog.afterClosed().subscribe(
      (result) => {
        let show = result.show;
        console.log(typeof show);

        if (show)
          this.selectedShows.push(show);
      },
      (error) => console.log(error)
    );

  }

  onEditCinemaHall(auditorium: string): void {
    alert(`edit ${auditorium}`);
  }

  onDeleteCinemaHall(auditorium: string): void {
    alert(`delete ${auditorium}`);
  }

  onEditShow(showName: string): void {
    alert(`edit show ${showName}`);
  }

  onDeleteShow(showName: string): void {
    alert(`delete show: ${showName}`);
  }

  onEditMovie(movieName: string): void {
    alert(`edit movie ${movieName}`);
  }

  onDeleteMovie(movieName: string): void {
    alert(`delete movie ${movieName}`);
  }
}
