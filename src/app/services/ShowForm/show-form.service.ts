import { Injectable } from '@angular/core';
import { Show } from 'src/app/interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class ShowFormService {

  private _shows!: Show[];

  constructor() { }

  get shows(): Show[] {
    return this._shows;
  }

  set shows(shows: Show[]) {
    this._shows = shows;
  }

  clearShows(): void {
    this._shows = [];
  }
}
