import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auditorium, Booking, Movie, MovieShow, Show, TempScreen, TempSelectMembers } from 'src/app/interfaces/application';
import { ApplicationService } from '../application/application.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private auditoriums: Auditorium[] = [];

  private movies: Movie[] = [];

  private movieShows: MovieShow[] = [];

  private nowPlayingMovies: Movie[] = [];

  private upComingMovies: Movie[] = [];

  private tempSelectMembers!: TempSelectMembers;

  private tempScreen!: TempScreen;

  constructor(private _service: ApplicationService) { }

  getAllAuditoriums(): Observable<Auditorium[]> {
    if (!this.auditoriums || this.auditoriums.length < 1) {
      console.warn("Calling All Auditoriums");
      return this._service.getAllAuditoriums().pipe(
        map(halls => {
          this.auditoriums = halls;
          console.table(this.auditoriums);
          return this.auditoriums;
        })
      );
    }
    else
      return of(this.auditoriums);
  }

  getAllMovies(): Observable<Movie[]> {
    if (!this.movies || this.movies.length < 1) {
      console.warn("Calling All Movies");
      return this._service.getAllMovies().pipe(
        map(movies => {
          this.movies = movies;
          return this.movies;
        })
      );
    }
    else
      return of(this.movies);
  }

  getAllMovieShows(): Observable<MovieShow[]> {
    if (!this.movieShows || this.movieShows.length < 1) {
      console.warn("Calling All Movie Shows");
      return this._service.getAllMovieShows().pipe(
        map(m_shows => {
          this.movieShows = m_shows;
          return this.movieShows;
        })
      );
    }
    else
      return of(this.movieShows);
  }

  getAllUpComingMovies(): Observable<Movie[]> {
    return this._service.getAllUpComingMovieShows().pipe(
      map(m_shows => {
        this.upComingMovies = [];
        m_shows.forEach(m_show => {
          this.getAllMovies().subscribe(movies => {
            this.upComingMovies.push(movies.find(movie => movie.id == m_show.movieId)!);
          });
        });
        console.error(this.upComingMovies);
        return this.upComingMovies;
      })
    );
  }

  getAllNowPlayingMovies(): Observable<Movie[]> {
    return this._service.getAllNowPlayingMovieShows().pipe(
      map(m_shows => {
        this.nowPlayingMovies = [];
        m_shows.forEach(m_show => {
          this.getAllMovies().subscribe(movies => {
            this.nowPlayingMovies.push(movies.find(movie => movie.id == m_show.movieId)!);
          });
        });
        return this.nowPlayingMovies;
      })
    );
  }

  getAllNowPlayingAndUpComing(): Observable<Movie[]> {
    return this._service.getAllNowPlayingAndUpComingMovieShows().pipe(
      map(m_shows => {
        this.nowPlayingMovies = [];
        m_shows.forEach(m_show => {
          this.getAllMovies().subscribe(movies => {
            this.nowPlayingMovies.push(movies.find(movie => movie.id == m_show.movieId)!);
          });
        });
        return this.nowPlayingMovies;
      })
    );
  }

  getFewNowPlayingMovies(): Observable<Movie[]> {
    return this._service.getFewNowPlayingMovieShows().pipe(
      map(m_shows => {
        this.nowPlayingMovies = [];
        m_shows.forEach(m_show => {
          this.getAllMovies().subscribe(movies => {
            this.nowPlayingMovies.push(movies.find(movie => movie.id == m_show.movieId)!);
          });
        });
        return this.nowPlayingMovies;
      })
    );
  }

  getFewUpComingMovies(): Observable<Movie[]> {
    return this._service.getFewUpComingMovieShows().pipe(
      map(m_shows => {
        this.nowPlayingMovies = [];
        m_shows.forEach(m_show => {
          this.getAllMovies().subscribe(movies => {
            this.nowPlayingMovies.push(movies.find(movie => movie.id == m_show.movieId)!);
          });
        });
        return this.nowPlayingMovies;
      })
    );
  }

  addMovie(movie: Movie): void {
    this.movies.push(movie);
    console.table(this.movies);
  }

  addAuditorium(auditorium: Auditorium): void {
    this.auditoriums.push(auditorium);
    console.table(this.auditoriums);
  }

  addShow(auditoriumId: number, show: Show): void {
    let shows: Show[] = this.auditoriums.find(hall => hall.id == auditoriumId)?.shows!;
    if (!shows)
      shows = [];
    shows.push(show);
    console.table(shows);
  }

  addMovieShows(auditoriumId: number, showId: number, movieShow: MovieShow): void {
    let m_shows: MovieShow[] = this.auditoriums.find(hall => hall.id == auditoriumId)?.shows.find(show => show.id == showId)?.movieShows!;
    if (!m_shows)
      m_shows = [];
    m_shows.push(movieShow);
    console.table(m_shows);
  }

  addBooking(auditoriumId: number, showId: number, movieShowId: number, booking: Booking): void {
    let bookings: Booking[] = this.auditoriums
      .find(hall => hall.id == auditoriumId)?.shows
      .find(show => show.id == showId)?.movieShows
      ?.find(m_show => m_show.id == movieShowId)?.bookings!;
    bookings.push(booking);
    console.table(bookings);
  }

  getAuditoriumNames(): Observable<string[]> {
    return this.getAllAuditoriums().pipe(
      map((halls: Auditorium[]) => {
        return halls ? [...new Set(halls.map(hall => hall.name))] : []
      })
    );
  }

  getMovieNames(): Observable<string[]> {
    return this.getAllMovies().pipe(
      map((movies: Movie[]) => {
        return movies ? [...new Set(movies.map(movie => movie.name))] : []
      })
    );
  }

  setTempSelectMembers(tempSelectMembers: TempSelectMembers): void {
    this.tempSelectMembers = tempSelectMembers;
  }

  getTempSelectMembers(): TempSelectMembers {
    return this.tempSelectMembers;
  }

  setTempScreen(tempScreen: TempScreen): void {
    this.tempScreen = tempScreen;
  }

  getTempScreen(): TempScreen {
    return this.tempScreen;
  }
}
