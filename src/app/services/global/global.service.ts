import { Injectable } from '@angular/core';
import { Auditorium, Movie, User } from 'src/app/interfaces/application';
import { ApplicationService } from '../application/application.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  auditoriums!: Auditorium[];

  movies!: Movie[];

  user!: User;

  constructor(private _service: ApplicationService) { }

  getAuditoriumNames(): string[] {
    return this.auditoriums.map(hall => hall.name);
  }

  getMovieNames(): string[] {
    return this.movies.map(movie => movie.name);
  }
}
