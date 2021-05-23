import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/commons/global-constants';
import { Auditorium, Booking, Movie, MovieShow, Show } from 'src/app/interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private _http: HttpClient) { }

  getAuditorium(auditoriumId: number): Observable<any> {
    return this._http.get<any>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}`);
  }

  getAuditoriums(): Observable<any> {
    return this._http.get<any>(GlobalConstants.GET_AUDITORIUM_URL);
  }

  addAuditorium(auditorium: Auditorium): Observable<any> {
    return this._http.post<any>(GlobalConstants.ADD_AUDITORIUM_URL, auditorium);
  }

  updateAuditorium(auditorium: Auditorium): Observable<any> {
    return this._http.put<any>(GlobalConstants.UPDATE_AUDITORIUM_URL, auditorium);
  }

  deleteAuditorium(auditoriumId: number): Observable<any> {
    return this._http.delete(`${GlobalConstants.DELETE_AUDITORIUM_URL}/${auditoriumId}`);
  }

  /* 
    ================= Movie Service ====================
  */

  getMovie(movieId: number): Observable<any> {
    return this._http.get<any>(`${GlobalConstants.MOVIE_URL}/${movieId}`);
  }

  getMovies(): Observable<any> {
    return this._http.get<any>(GlobalConstants.GET_MOVIE_URL);
  }

  addMovie(movie: Movie): Observable<any> {
    return this._http.post<any>(GlobalConstants.ADD_MOVIE_URL, movie);
  }

  updateMovie(movie: Movie): Observable<any> {
    return this._http.put<any>(GlobalConstants.UPDATE_MOVIE_URL, movie);
  }

  deleteMovie(movieId: number): Observable<any> {
    return this._http.delete(`${GlobalConstants.DELETE_MOVIE_URL}/${movieId}`);
  }

  /* 
    ================= Show Service ====================
  */

  getShow(showId: number): Observable<any> {
    return this._http.get<any>(`${GlobalConstants.SHOW_URL}/${showId}`);
  }

  getShows(): Observable<any> {
    return this._http.get<any>(GlobalConstants.GET_SHOW_URL);
  }

  addShow(show: Show): Observable<any> {
    return this._http.post<any>(GlobalConstants.ADD_SHOW_URL, show);
  }

  updateShow(show: Show): Observable<any> {
    return this._http.put<any>(GlobalConstants.UPDATE_SHOW_URL, show);
  }

  deleteShow(showId: number): Observable<any> {
    return this._http.delete(`${GlobalConstants.DELETE_SHOW_URL}/${showId}`);
  }


  /* 
    ================= Movie Show Service ====================
  */

  getMovieShow(movieShowId: number): Observable<any> {
    return this._http.get<any>(`${GlobalConstants.MOVIESHOWS_URL}/${movieShowId}`);
  }

  getMovieShows(): Observable<any> {
    return this._http.get<any>(GlobalConstants.GET_MOVIESHOWS_URL);
  }

  addMovieShow(movieShow: MovieShow): Observable<any> {
    return this._http.post<any>(GlobalConstants.ADD_MOVIESHOWS_URL, movieShow);
  }

  updateMovieShow(movieShow: MovieShow): Observable<any> {
    return this._http.put<any>(GlobalConstants.UPDATE_MOVIESHOWS_URL, movieShow);
  }

  deleteMovieShow(movieShowId: number): Observable<any> {
    return this._http.delete(`${GlobalConstants.DELETE_MOVIESHOWS_URL}/${movieShowId}`);
  }


  /* 
    ================= Booking Service ====================
  */

  getBooking(booking: number): Observable<any> {
    return this._http.get<any>(`${GlobalConstants.BOOKING_URL}/${booking}`);
  }

  getBookings(): Observable<any> {
    return this._http.get<any>(GlobalConstants.GET_BOOKING_URL);
  }

  addBooking(booking: Booking): Observable<any> {
    return this._http.post<any>(GlobalConstants.ADD_BOOKING_URL, booking);
  }

  updateBooking(booking: Booking): Observable<any> {
    return this._http.put<any>(GlobalConstants.UPDATE_BOOKING_URL, booking);
  }

  deleteBooking(booking: number): Observable<any> {
    return this._http.delete(`${GlobalConstants.DELETE_BOOKING_URL}/${booking}`);
  }
}

