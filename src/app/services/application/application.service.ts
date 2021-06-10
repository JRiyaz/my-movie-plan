import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/commons/global-constants';
import { Auditorium, BookedSeats, Booking, HttpResponse, Movie, MovieShow, Show } from 'src/app/interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private _http: HttpClient) { }

  getAuditorium(auditoriumId: number): Observable<Auditorium> {
    return this._http.get<Auditorium>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}`);
  }

  getAllAuditoriums(): Observable<Auditorium[]> {
    return this._http.get<Auditorium[]>(GlobalConstants.GET_ALL_AUDITORIUMS_URL);
  }

  addAuditorium(auditorium: Auditorium): Observable<Auditorium> {
    return this._http.post<Auditorium>(GlobalConstants.ADD_AUDITORIUM_URL, auditorium);
  }

  updateAuditorium(auditorium: Auditorium): Observable<Auditorium> {
    return this._http.put<Auditorium>(GlobalConstants.UPDATE_AUDITORIUM_URL, auditorium);
  }

  deleteAuditorium(auditoriumId: number): Observable<HttpResponse> {
    return this._http.delete<HttpResponse>(`${GlobalConstants.DELETE_AUDITORIUM_URL}/${auditoriumId}`);
  }

  /* 
    ================= Movie Service ====================
  */

  getMovie(movieId: number): Observable<Movie> {
    return this._http.get<Movie>(`${GlobalConstants.MOVIE_URL}/${movieId}`, { headers: { skip: "true" } });
  }

  getAllNowPlayingAndUpComingMovies(): Observable<Movie[]> {
    return this._http.get<Movie[]>(GlobalConstants.NOW_PLAYING_AND_UP_COMING_MOVIES_URL, { headers: { skip: "true" } });
  }

  getAllNowPlayingMovies(): Observable<Movie[]> {
    return this._http.get<Movie[]>(GlobalConstants.NOW_PLAYING_MOVIES_URL, { headers: { skip: "true" } });
  }

  getFewNowPlayingMovies(): Observable<Movie[]> {
    let params = new HttpParams().set('records', '4');
    return this._http.get<Movie[]>(GlobalConstants.NOW_PLAYING_MOVIES_URL, { params, headers: { skip: 'true' } });
  }

  getFewUpComingMovies(): Observable<Movie[]> {
    let params = new HttpParams().set('records', '4');
    return this._http.get<Movie[]>(GlobalConstants.UP_COMING_MOVIES_URL, { params: { 'records': '4' }, headers: { skip: 'true' } });
  }

  getAllUpComingMovies(): Observable<Movie[]> {
    return this._http.get<Movie[]>(GlobalConstants.UP_COMING_MOVIES_URL, { headers: { skip: "true" } });
  }

  getAllNotPlayingMovies(): Observable<Movie[]> {
    return this._http.get<Movie[]>(GlobalConstants.NOT_PLAYING_MOVIES_URL, { headers: { skip: "true" } });
  }

  getAllMovies(): Observable<Movie[]> {
    return this._http.get<Movie[]>(GlobalConstants.GET_ALL_MOVIES_URL, { headers: { skip: "true" } });
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this._http.post<Movie>(GlobalConstants.ADD_MOVIE_URL, movie);
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this._http.put<Movie>(GlobalConstants.UPDATE_MOVIE_URL, movie);
  }

  deleteMovie(movieId: number): Observable<HttpResponse> {
    return this._http.delete<HttpResponse>(`${GlobalConstants.DELETE_MOVIE_URL}/${movieId}`);
  }

  /* 
    ================= Show Service ====================
  */

  getShowsByMovieId(auditoriumId: number, movieId: number): Observable<Show[]> {
    return this._http.get<Show[]>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}/movie/${movieId}`)
  }

  getShow(showId: number): Observable<Show> {
    return this._http.get<Show>(`${GlobalConstants.SHOW_URL}/${showId}`);
  }

  getAuditoriumShow(auditoriumId: number, showId: number): Observable<Show> {
    return this._http.get<Show>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}/show/${showId}`);
  }

  getAllShows(): Observable<Show[]> {
    return this._http.get<Show[]>(`${GlobalConstants.SHOW_URL}/all`);
  }

  getAllAuditoriumShows(auditoriumId: number): Observable<Show[]> {
    return this._http.get<Show[]>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}/show/all`);
  }

  addShow(auditoriumId: number, show: Show): Observable<Show> {
    return this._http.post<Show>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}/show/add`, show);
  }

  updateShow(auditoriumId: number, show: Show): Observable<Show> {
    return this._http.put<Show>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}/show/update`, show);
  }

  deleteShow(showId: number): Observable<HttpResponse> {
    return this._http.delete<HttpResponse>(`${GlobalConstants.SHOW_URL}/delete/${showId}`);
  }


  /* 
    ================= Movie Show Service ====================
  */

  getAuditoriumsByMovieId(movieId: number): Observable<Auditorium[]> {
    return this._http.get<Auditorium[]>(`${GlobalConstants.AUDITORIUM_URL}/movie/${movieId}`)
  }

  getMovieShow(movieShowId: number): Observable<MovieShow> {
    return this._http.get<MovieShow>(`${GlobalConstants.MOVIESHOWS_URL}/${movieShowId}`);
  }

  getAuditoriumShowMovieShow(auditoriumId: number, showId: number, movieShowId: number): Observable<MovieShow> {
    return this._http.get<MovieShow>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}/show/${showId}/movie-show/${movieShowId}`);
  }

  getAllMovieShows(): Observable<MovieShow[]> {
    return this._http.get<MovieShow[]>(`${GlobalConstants.MOVIESHOWS_URL}/all`);
  }

  getAllAuditoriumShowMovieShows(auditoriumId: number, showId: number): Observable<MovieShow[]> {
    return this._http.get<MovieShow[]>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}/show/${showId}/movie-show/all`);
  }

  addMovieShow(auditoriumId: number, showId: number, movieShow: MovieShow): Observable<MovieShow> {
    return this._http.post<MovieShow>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}/show/${showId}/movie-show/add`, movieShow);
  }

  updateMovieShow(auditoriumId: number, showId: number, movieShow: MovieShow): Observable<MovieShow> {
    return this._http.put<MovieShow>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}/show/${showId}/movie-show/update`, movieShow);
  }

  deleteMovieShow(movieShowId: number): Observable<HttpResponse> {
    return this._http.delete<HttpResponse>(`${GlobalConstants.MOVIESHOWS_URL}/delete/${movieShowId}`);
  }


  /* 
    ================= Booking Service ====================
  */

  getBooking(bookingId: number): Observable<Booking> {
    return this._http.get<Booking>(`${GlobalConstants.BOOKING_URL}/${bookingId}`);
  }

  getAuditoriumShowMovieShowBooking(auditoriumId: number, showId: number, movieShowId: number, bookingId: number): Observable<Booking> {
    return this._http.get<Booking>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}/show/${showId}/movie-show/${movieShowId}/booking/${bookingId}`);
  }

  getAllBookings(): Observable<Booking[]> {
    return this._http.get<Booking[]>(`${GlobalConstants.BOOKING_URL}/all`);
  }

  getAllAuditoriumShowMovieShowBookings(auditoriumId: number, showId: number, movieShowId: number): Observable<Booking[]> {
    return this._http.get<Booking[]>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}/show/${showId}/movie-show/${movieShowId}/booking/all`);
  }

  addBooking(auditoriumId: number, showId: number, movieShowId: number, booking: Booking): Observable<Booking> {
    return this._http.post<Booking>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}/show/${showId}/movie-show/${movieShowId}/booking/add`, booking);
  }

  updateBooking(auditoriumId: number, showId: number, movieShowId: number, booking: Booking): Observable<Booking> {
    return this._http.put<Booking>(`${GlobalConstants.AUDITORIUM_URL}/${auditoriumId}/show/${showId}/movie-show/${movieShowId}/booking/update`, booking);
  }

  deleteBooking(bookingId: number): Observable<any> {
    return this._http.delete(`${GlobalConstants.BOOKING_URL}/delete/${bookingId}`);
  }

  getAllUserBooking(userId: string): Observable<Booking[]> {
    return this._http.get<Booking[]>(`${GlobalConstants.BOOKING_URL}/${userId}/all`);
  }

  /* 
    ================= Now Playing, Up Coming and Not Playing Movie Shows Service ====================
  */

  getAllNowPlayingAndUpComingMovieShows(): Observable<MovieShow[]> {
    return this._http.get<MovieShow[]>(GlobalConstants.NOW_PLAYING_AND_UP_COMING_MOVIE_SHOWS_URL, { headers: { skip: "true" } });
  }

  getAllNowPlayingMovieShows(): Observable<MovieShow[]> {
    return this._http.get<MovieShow[]>(GlobalConstants.NOW_PLAYING_MOVIE_SHOWS_URL, { headers: { skip: "true" } });
  }

  getFewNowPlayingMovieShows(): Observable<MovieShow[]> {
    let params = new HttpParams().set('records', '4');
    return this._http.get<MovieShow[]>(GlobalConstants.NOW_PLAYING_MOVIE_SHOWS_URL, { params, headers: { skip: "true" } });
  }

  getFewUpComingMovieShows(): Observable<MovieShow[]> {
    let params = new HttpParams().set('records', '4');
    return this._http.get<MovieShow[]>(GlobalConstants.UP_COMING_MOVIE_SHOWS_URL, { params: { 'records': '4' }, headers: { skip: "true" } });
  }

  getAllUpComingMovieShows(): Observable<MovieShow[]> {
    return this._http.get<MovieShow[]>(GlobalConstants.UP_COMING_MOVIE_SHOWS_URL, { headers: { skip: "true" } });
  }

  getAllNotPlayingMovieShows(): Observable<MovieShow[]> {
    return this._http.get<MovieShow[]>(GlobalConstants.NOT_PLAYING_MOVIE_SHOWS_URL, { headers: { skip: "true" } });
  }

  // todo: create this endpoint
  getAllBookedSeats(movieShowId: number, on: Date): Observable<BookedSeats> {
    // new Date('Sun May 11,2014').toLocaleDateString('fr-CA')    2014-05-11
    // let params = new HttpParams().set('on', on.toISOString().slice(0, 10));
    // let params = new HttpParams().set('on', o);
    return this._http.get<BookedSeats>(`${GlobalConstants.MOVIESHOWS_URL}/${movieShowId}/booked-seats/${on.toLocaleDateString('fr-CA')}`);
  }

  /* 
  ================= Booking Details ====================
  */

  getBookingDetails(bookingId: number): Observable<Booking> {
    return this._http.get<Booking>(`${GlobalConstants.BOOKING_URL}/${bookingId}/details`);
  }
}

