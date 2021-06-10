import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UserImpl } from 'src/app/interfaces/application';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = new BehaviorSubject<User>(new UserImpl());
  user$ = this.user.asObservable();

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.getLoggedInUser().subscribe(user => this.user.next(user));
  }

}
