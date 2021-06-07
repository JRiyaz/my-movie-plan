import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _bar: MatSnackBar) { }

  postionAlert(message: string, action: string = 'OK', alertClass: string = 'success-alert', duration: number = 5000, verticalPosition = 'top', horizontalPosition: string = 'end'): void {
    this._bar.open(message, action, {
      duration: 5000,
      verticalPosition: verticalPosition as MatSnackBarVerticalPosition, // 'top' | 'bottom'
      horizontalPosition: horizontalPosition as MatSnackBarHorizontalPosition, //'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: [alertClass],
    });
  }

  defaultAlert(message: string, action: string = 'OK', duration: number = 3000): void {
    this._bar.open(message, action, { duration: duration });
  }


  // if (message)
  //   this._bar.open(message, 'Home', {
  //     duration: 3000,
  //     verticalPosition: 'bottom', // 'top' | 'bottom'
  //     horizontalPosition: 'end', //'start' | 'center' | 'end' | 'left' | 'right'
  //     panelClass: ['red-snackbar'],
  //   }
  //   ).onAction().subscribe(
  //     res => this._router.navigate(['./login'])
  //   );
}
