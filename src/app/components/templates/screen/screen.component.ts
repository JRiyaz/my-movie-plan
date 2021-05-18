import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  alphabets: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'
  ];

  alreadySelectedSeats: Set<string> = new Set();

  seatsToBeSelected: number = 5;

  nowSelectedSeats: Set<string> = new Set();

  seats!: number[];

  price: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.seats = [...Array(15).keys()].filter(num => num > 0);
    let seats = this.alreadySelectedSeats;
    seats.add('A6');
    seats.add('B10');
    seats.add('J3');
    seats.add('J4');
    seats.add('F8');
  }

  addSeat(event: any): boolean {
    const value: string = event.target.value;
    if (this.alreadySelectedSeats.has(value))
      return false;
    const seats = this.nowSelectedSeats;
    if (seats.has(value) && seats.delete(value)) {
      if (value.startsWith('J') || value.startsWith('I') || value.startsWith('H'))
        this.price -= 350;
      else if (value.startsWith('A') || value.startsWith('B') || value.startsWith('C'))
        this.price -= 200;
      else
        this.price -= 300;
      this.seatsToBeSelected++;
      return false;
    }
    else {
      if (this.seatsToBeSelected == 0)
        return false;
      seats.add(value);
      if (value.startsWith('J') || value.startsWith('I') || value.startsWith('H'))
        this.price += 350;
      else if (value.startsWith('A') || value.startsWith('B') || value.startsWith('C'))
        this.price += 200;
      else
        this.price += 300;
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
}
