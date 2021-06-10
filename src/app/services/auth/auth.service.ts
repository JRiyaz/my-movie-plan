import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/commons/global-constants';
import { Credentials, HttpResponse, Token, User } from 'src/app/interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  registerUser(user: User): Observable<HttpResponse> {
    return this._http.post<HttpResponse>(GlobalConstants.REGISTER_URL, user, { headers: { skip: "true" } });
  }

  checkUniqueness(username: string): Observable<Token> {
    return this._http.get<Token>(`${GlobalConstants.CHECK_UNIQUENESS_URL}/${username}`, { headers: { skip: "true" } });
  }

  loginUser(credentials: Credentials): Observable<Token> {
    return this._http.post<Token>(GlobalConstants.AUTHENTICATE_URL, credentials, { headers: { skip: "true" } });
  }

  forgotPassword(credentials: Credentials): Observable<HttpResponse> {
    return this._http.put<HttpResponse>(GlobalConstants.FORGOT_PASSWORD_URL, credentials, { headers: { skip: "true" } });
  }

  updateUser(userId: string, user: User): Observable<User> {
    return this._http.put<User>(`${GlobalConstants.UPDATE_USER_URL}/${userId}`, user);
  }

  getLoggedInUser(): Observable<User> {
    return this._http.get<User>(GlobalConstants.GET_LOGGED_IN_USER_URL);
  }
}
