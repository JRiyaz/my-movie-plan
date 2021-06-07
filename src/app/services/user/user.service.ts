import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/application';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _authService: AuthService, private _router: Router) { }

  getUser(): User | null {
    const user_email = localStorage.getItem('user-email');
    const user_role = localStorage.getItem('user-role');
    const user_id = localStorage.getItem('user-id');

    // if (this.getToken() != null && user_email == null)
    //   this.setToken(this.getToken()!);

    if (user_email && user_role && user_id) {
      const user: User = {
        email: user_email,
        userRole: user_role,
        id: user_id
      }
      return user;
    }
    else
      return null;
  }

  private setUser(user: User): void {
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-role', user.userRole);
    localStorage.setItem('user-id', user.id!);
  }

  private removeUser(): boolean {
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-role');
    localStorage.removeItem('user-id');
    return true;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return !!user?.userRole && (user?.userRole == 'ROLE_ADMIN' || user?.userRole == 'ROLE_SUPER_ADMIN')
  }

  setToken(token: string): boolean {
    console.warn('from set Token');
    localStorage.setItem('token', token);
    this._authService.getLoggedInUser().subscribe(user => {
      this.setUser(user)
    });
    return true
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    // if (!token) {
    //   this._router.navigate(['/user/login'], { queryParams: { 'wrong': true } });
    //   return;
    // }
    return token;
  }

  removeToken(): boolean {
    console.warn('from remove token');
    localStorage.removeItem('token');
    this.removeUser();
    return true;
  }
}
