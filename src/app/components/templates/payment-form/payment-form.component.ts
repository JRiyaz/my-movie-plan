import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Util } from 'src/app/classes/util/util';
import { Booking, BookingDetails, Payment, TempScreen, TempSelectMembers } from 'src/app/interfaces/application';
import { ApplicationService } from 'src/app/services/application/application.service';
import { GlobalService } from 'src/app/services/global/global.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  @ViewChild('ccNumber') ccNumberField!: ElementRef;

  paymentForm!: FormGroup;

  cvvHide: boolean = true;

  tempMonths: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  tempYears: number[] = [];

  // amountToBePaid!: number;

  tempScreen!: TempScreen;

  selectedMembers!: TempSelectMembers;

  constructor(private _fb: FormBuilder,
    private _global: GlobalService,
    private _appService: ApplicationService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.tempScreen = this._global.getTempScreen();
    this.selectedMembers = this._global.getTempSelectMembers();

    if (!this.tempScreen && !this.selectedMembers)
      this._router.navigate(['/home'], { queryParams: { payment: 'false' } });

    [...Array(9).keys()].forEach(num => this.tempYears.push(new Date().getFullYear() + num));

    // this.amountToBePaid = this.tempScreen.amount;

    this.paymentForm = this._fb.group({
      cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[ 0-9]*$'), Validators.minLength(17)]),
      cardExpiryMonth: new FormControl('', Validators.required),
      cardExpiryYear: new FormControl('', Validators.required),
      cardCVV: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')])
    });
  }

  get cardNumberErrors(): string {
    let card = this.paymentForm.get('cardNumber');
    if (card?.hasError('required'))
      return 'Card Number cannot be empty';
    else if (card?.hasError('pattern'))
      return 'Invalid card number';
    return '';
  }

  get monthErrors(): string {
    let month = this.paymentForm.get('cardExpiryMonth');
    return month?.hasError('required') ? 'Month cannot be empty' : '';
  }

  get yearErrors(): string {
    let year = this.paymentForm.get('cardExpiryYear');
    return year?.hasError('required') ? 'Year cannot be empty' : '';
  }

  get cvvErrors(): string {
    let cvv = this.paymentForm.get('cardCVV');
    if (cvv?.hasError('required'))
      return 'CVV Number cannot be empty';
    else if (cvv?.hasError('pattern'))
      return 'Invalid CVV number';
    return '';
  }

  /* Insert spaces to enhance legibility of credit card numbers */
  creditCardNumberSpacing() {
    const input = this.ccNumberField.nativeElement;
    const { selectionStart } = input;
    const { cardNumber } = this.paymentForm.controls;

    let trimmedCardNum = cardNumber.value.replace(/\s+/g, '');

    if (trimmedCardNum.length > 16) {
      trimmedCardNum = trimmedCardNum.substr(0, 16);
    }

    /* Handle American Express 4-6-5 spacing */
    const partitions = trimmedCardNum.startsWith('34') || trimmedCardNum.startsWith('37')
      ? [4, 6, 5]
      : [4, 4, 4, 4];

    const numbers: any[] = [];
    let position = 0;
    partitions.forEach(partition => {
      const part = trimmedCardNum.substr(position, partition);
      if (part) numbers.push(part);
      position += partition;
    })

    cardNumber.setValue(numbers.join(' '));

    /* Handle caret position if user edits the number later */
    if (selectionStart < cardNumber.value.length - 1) {
      input.setSelectionRange(selectionStart, selectionStart, 'none');
    }
  }

  formatTime(time: string): string {
    return Util.formatTimeToAmOrPm(time);
  }

  onSubmit(): void {
    const members = this.selectedMembers;
    if (this.tempScreen && members && this.paymentForm.value) {
      const paymentData: Payment = this.paymentForm.value;
      paymentData.paymentDate = new Date();
      paymentData.amount = this.tempScreen.amount;

      const b_details: BookingDetails = {
        auditoriumId: members.auditoriumId,
        showId: members.showId,
        movieShowId: members.movieShowId,
        movieId: members.movieId,
      }

      const booking: Booking = {
        amount: this.tempScreen.amount,
        bookedOn: new Date(),
        dateOfBooking: members.date,
        totalSeats: this.tempScreen.selectedSeats,
        seatNumbers: this.tempScreen.selectedSeatNumbers,
        bookingDetails: b_details,
        payment: paymentData,
      }
      this._appService.addBooking(members.auditoriumId, members.showId, members.movieShowId, booking)
        .subscribe(booking => {
          if (booking) {
            this._router.navigate(['/my/bookings'], { queryParams: { 'payment': true } });
          }
        })
    }
  }
}
