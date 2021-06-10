import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Util } from 'src/app/classes/util/util';
import { Booking } from 'src/app/interfaces/application';
import { ApplicationService } from 'src/app/services/application/application.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  present: boolean = true;

  heading = 'Your booking list';

  bookings!: Booking[];
  allBookings = new BehaviorSubject<Booking[]>(this.bookings);
  allBookings$ = this.allBookings.asObservable();

  auditoriumName$ = new BehaviorSubject<string>('');
  showName$ = new BehaviorSubject<string>('');
  showTiming$ = new BehaviorSubject<string>('');
  movieName$ = new BehaviorSubject<string>('');
  movieLanguage$ = new BehaviorSubject<string>('');
  dateOfBooking$ = new BehaviorSubject<Date>(new Date());
  movieImage$ = new BehaviorSubject<string>('');
  noOfTickets$ = new BehaviorSubject<number>(0);
  selectedSeats$ = new BehaviorSubject<string[]>([]);
  amount$ = new BehaviorSubject<number>(0);


  selectedBookingId = 0;

  constructor(private _appService: ApplicationService,
    private _userService: UserService,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    const userId = this._userService.getUser()?.id;

    this._appService.getAllUserBooking(userId!).subscribe(bookings => {
      if (bookings.length < 1) {
        this.heading = 'Booking list is empty';
        this.present = false;
      }
      const all_bookings = bookings.sort((booking1, booking2) => Util.sortByDates(booking1.dateOfBooking, booking2.dateOfBooking));
      this.allBookings.next(all_bookings);
      this.setBooking(all_bookings[0]);
    });
  }

  formatTime(time: string): string {
    return Util.formatTimeToAmOrPm(time);
  }

  onBookingChange(bookingId: number): void {
    if (this.selectedBookingId != bookingId) {
      this.allBookings$.pipe(
        map(bookings => {
          const booking = bookings.find(booking => booking.id == bookingId)!;
          this.setBooking(booking);
        })
      );
    }
  }

  setBooking(booking: Booking) {
    this.selectedBookingId = booking?.id!;
    this.amount$.next(booking?.amount!);
    this.dateOfBooking$.next(booking?.dateOfBooking!);
    this.noOfTickets$.next(booking?.totalSeats!);
    this.selectedSeats$.next(booking?.seatNumbers!);
    this._globalService.getAllAuditoriums().subscribe(halls => {
      const auditorium = halls.find(hall => hall.id == booking?.bookingDetails.auditoriumId);
      this.auditoriumName$.next(auditorium?.name!);
      const show = auditorium?.shows.find(show => show.id == booking?.bookingDetails.showId);
      this.showName$.next(show?.name!);
      this.showTiming$.next(show?.startTime!);
    });

    this._globalService.getAllMovies().subscribe(movies => {
      const movie = movies.find(movie => movie.id == booking?.bookingDetails.movieId);
      this.movieImage$.next(movie?.image!);
      this.movieLanguage$.next(movie?.language!);
      this.movieName$.next(movie?.name!);
    });
  }



}
