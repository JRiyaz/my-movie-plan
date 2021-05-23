import { Component, OnInit } from '@angular/core';
import { TempScreen } from 'src/app/interfaces/application';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  tempSeatColumns: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'
  ];

  tempSeatRows!: number[];

  alreadySelectedSeats: Set<string> = new Set();

  seatsToBeSelected: number = 5;

  nowSelectedSeats: Set<string> = new Set();

  totalAmount: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.tempSeatRows = [...Array(9).keys()].filter(num => num > 0);
    // let seats = this.alreadySelectedSeats;
    // seats.add('A6');
    // seats.add('B10');
    // seats.add('J3');
    // seats.add('J4');
    // seats.add('F8');
  }

  addSeat(event: any): boolean {
    const value: string = event.target.value;
    if (this.alreadySelectedSeats.has(value))
      return false;
    const seats = this.nowSelectedSeats;
    if (seats.has(value) && seats.delete(value)) {
      if (value.startsWith('J') || value.startsWith('I') || value.startsWith('H'))
        this.totalAmount -= 350;
      else if (value.startsWith('A') || value.startsWith('B') || value.startsWith('C'))
        this.totalAmount -= 200;
      else
        this.totalAmount -= 300;
      this.seatsToBeSelected++;
      return false;
    }
    else {
      if (this.seatsToBeSelected == 0)
        return false;
      seats.add(value);
      if (value.startsWith('J') || value.startsWith('I') || value.startsWith('H'))
        this.totalAmount += 350;
      else if (value.startsWith('A') || value.startsWith('B') || value.startsWith('C'))
        this.totalAmount += 200;
      else
        this.totalAmount += 300;
      this.seatsToBeSelected--;
      return true;
    }
  }

  isAdded(value: string): boolean {
    return this.nowSelectedSeats.has(value) ? true : false;
  }

  isSeatAlreadySelected(value: string): boolean {
    return this.alreadySelectedSeats.has(value) ? true : false;
  }

  toString(): string {
    return [...this.nowSelectedSeats].join(', ');
  }

  onProceed(): void {
    const auditoriumShowBooking: TempScreen = {
      auditoriumId: 1,  // Get this from tempApplicationService
      showId: 1,        //Get this from tempApplicationService
      amount: this.totalAmount,
      selectedSeats: this.nowSelectedSeats
    }
    // Set the above "auditoriumShowBooking" to tempApplicationService for futher action
  }
}
