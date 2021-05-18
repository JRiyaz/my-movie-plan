import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: any[] = [
    { id: 1, name: 'Riyaz J', email: 'j.riyazu@gmail.com', gender: 'Male', address: { city: 'Bengaluru', street: 'KR Puram', zip: '8099531318' } },
    { id: 2, name: 'Fayaz J', email: 'j.fayaz@gmail.com', gender: 'Male', address: { city: 'Hyderabad', street: 'Kukatpalli', zip: '660006' } },
    { id: 3, name: 'Inthiyaz J', email: 'j.inthiyaz@gmail.com', gender: 'Male', address: { city: 'B.Kothakota', street: 'Santha Bazar Street', zip: '517370' } },
    { id: 4, name: 'Begum J', email: 'j.begum@gmail.com', gender: 'Female', address: { city: 'B.Kothakota', street: 'Santha Bazar Street', zip: '517370' } },
    { id: 5, name: 'Alfiya', email: 'j.alfiya@gmail.com', gender: 'Female', address: { city: 'B.Kothakota', street: 'Santha Bazar Street', zip: '517370' } },
    { id: 6, name: 'Aisha', email: 'j.aisha@gmail.com', gender: 'Female', address: { city: 'B.Kothakota', street: 'Santha Bazar Street', zip: '517370' } },
    { id: 7, name: 'Apsa', email: 'j.apsa@gmail.com', gender: 'Female', address: { city: 'B.Kothakota', street: 'Santha Bazar Street', zip: '517370' } },
    { id: 8, name: 'Yusuf', email: 'j.yusuf@gmail.com', gender: 'Male', address: { city: 'B.Kothakota', street: 'Santha Bazar Street', zip: '517370' } },
  ]

  constructor() { }

  // isEmailExists(email: string): boolean {
  //   return this.users.find(user => user.email == email) ? true : false;
  // }

  isEmailExists(email: string): Observable<boolean> {
    return of<boolean>(this.users.find(user => user.email == email)).pipe(delay(4000));
  }

  isMobileExists(mobile: string): Observable<boolean> {
    return of<boolean>(this.users.find(user => user.zip == mobile)).pipe(delay(4000));
  }

  isEmailOrMobileExists(email_mobile: string): Observable<boolean> {
    let isFound = false;
    for (let i = 0; i < this.users.length; i++) {
      console.log(this.users[i].name);
      if (this.users[i].email == email_mobile || this.users[i].zip == email_mobile) {
        isFound = true;
        break;
      }
    }
    return of<boolean>(isFound).pipe(delay(4000));
  }
}
