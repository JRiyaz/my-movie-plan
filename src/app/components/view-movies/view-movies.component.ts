import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ViewMoviesComponent implements OnInit {

  genre = new FormControl();
  genres: string[] = [
    'All',
    'Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Thriller'
  ];

  languages: any = {
    hindi: false,
    telugu: false,
    english: false,
    tamil: false,
    kanada: false,
    malayalam: false
  };

  updateAllComplete(): void {

  }

  constructor() {
    console.log(this.languages.hindi);
  }

  ngOnInit(): void {
  }

  clearLanguageFilter(): void {
    console.log("filter");

  }

  clearLanguageGenre(): void {

  }

}
