import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/commons/global-constants';
import { Credentials, User } from 'src/app/interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    return this._http.post<any>(GlobalConstants.REGISTER_URL, user);
  }

  checkUniqueness(username: string): Observable<string> {
    return this._http.get<string>(`${GlobalConstants.CHECK_UNIQUENESS_URL}/${username}`);
  }

  loginUser(credentials: Credentials): Observable<any> {
    return this._http.post<any>(GlobalConstants.AUTHENTICATE_URL, credentials);
  }

  forgotPassword(credentials: Credentials): Observable<any> {
    return this._http.put<any>(GlobalConstants.FORGOT_PASSWORD_URL, credentials);
  }
}
