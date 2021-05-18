import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Auditorium } from 'src/app/interfaces/application';
import { SelectMembersComponent } from '../templates/select-members/select-members.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MovieComponent implements OnInit {

  people!: string;
  seats: number = 5;

  // auditorium: Auditorium[] = [
  //   {
  //     name: 'Cinema 1',
  //     email: 'dummy@gmail.com',
  //      shows: [
  //       {
  //         time:
  //           new Date("11/10/2016, 11:00:00 AM"),
  //         seats: 0
  //       },
  //       {
  //         time:
  //           new Date("11/10/2016, 02:00:00 PM"),
  //         seats: 2
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Cinema 2', shows: [
  //       {
  //         time:
  //           new Date("11/10/2016, 11:00:00 AM"),
  //         seats: 3
  //       },
  //       {
  //         time:
  //           new Date("11/10/2016, 06:00:00 PM"),
  //         seats: 4
  //       },
  //       {
  //         time:
  //           new Date("11/10/2016, 09:00:00 PM"),
  //         seats: 3
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Cinema 5', shows: [
  //       {
  //         time:
  //           new Date("11/10/2016, 06:00:00 PM"),
  //         seats: 10
  //       },
  //       {
  //         time:
  //           new Date("11/10/2016, 11:00:00 PM"),
  //         seats: 1
  //       }
  //     ]
  //   }
  // ];

  auditorium!: any;
  constructor(private mbs: MatBottomSheet) { }

  ngOnInit(): void {
  }

  openBottomSheet(): void {
    let sheet = this.mbs.open(SelectMembersComponent, { data: this.auditorium });
    sheet.afterDismissed().subscribe(data => console.log(data.data));
  }

}
