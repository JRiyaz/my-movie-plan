import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from 'src/app/interfaces/application';
import { ApplicationService } from 'src/app/services/application/application.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  bookings!: Booking[];
  allBookings = new BehaviorSubject<Booking[]>(this.bookings);
  allBookings$ = this.allBookings.asObservable();

  currentBookingId = 0;

  constructor(private _appService: ApplicationService,
    private _gService: GlobalService) { }

  ngOnInit(): void {
    // const username = this._gService.getUser()?.then(user => {
    //   this._appService.getAllUserBooking(user?.id!).subscribe(bookings => this.allBookings.next(bookings));
    // });
  }

  onBookingChange(bookingId: number): void {
  }

}
