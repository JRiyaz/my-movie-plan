import { Injectable } from '@angular/core';
import { Auditorium, Movie } from 'src/app/interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  auditoriums: Auditorium[] = [
    {
      name: 'Cinema 1',
      shows: [
        {
          name: 'show 1',
          startTime: new Date().toLocaleTimeString('en-US'),
          movieShows: [
            {
              movieId: 1,
              showId: 1,
              from: new Date(),
              to: new Date('30 May 2021')
            },
            {
              movieId: 3,
              showId: 1,
              to: new Date()
            }
          ]
        },
        {
          name: 'show 2',
          startTime: new Date().toLocaleTimeString('en-US'),
          movieShows: [
            {
              movieId: 2,
              showId: 2,
              from: new Date()
            }
          ]
        }
      ]
    },
    {
      name: 'Cinema 2',
      shows: [
        {
          name: 'show 2',
          startTime: new Date().toLocaleTimeString('en-US'),
          movieShows: [
            {
              movieId: 2,
              showId: 2,
              from: new Date()
            },
            {
              movieId: 3,
              showId: 2,
              from: new Date()
            }
          ]
        }
      ]
    },
    {
      name: 'Cinema 3',
      shows: [
        {
          name: 'show 1',
          startTime: new Date().toLocaleTimeString('en-US'),
          movieShows: [
            {
              movieId: 5,
              showId: 1,
              from: new Date()
            }
          ]
        }
      ]
    },
    {
      name: 'Cinema 5',
      shows: [
        {
          name: 'show 1',
          startTime: new Date().toLocaleTimeString('en-US'),
          movieShows: [
            {
              movieId: 1,
              showId: 1,
              from: new Date()
            }
          ]
        },
        {
          name: 'show 2',
          startTime: new Date().toLocaleTimeString('en-US'),
          movieShows: [
            {
              movieId: 2,
              showId: 2,
              from: new Date()
            }
          ]
        }
      ]
    }
  ];

  movies: Movie[] = [
    {
      name: 'Move 1',
      id: 1
    },
    {
      name: 'Move 2',
      id: 2,
      release: new Date('20 May 2021')
      // release: new Date('20 May 2021 ').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    },
    {
      name: 'Move 3',
      id: 3
    },
    {
      name: 'Move 4',
      id: 4
    },
    {
      name: 'Move 5',
      id: 5
    }
  ]

  constructor() { }

  getAuditoriumNames(): string[] {
    return this.auditoriums.map(auditorium => auditorium.name);
  }

  getMovieNames(): string[] {
    return this.movies.map(movie => movie.name);
  }
}
