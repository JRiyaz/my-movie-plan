import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _injector: Injector, private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const userService = this._injector.get(UserService);
    const token = userService.getToken()!;

    if (req.headers.get('skip') && token) {
      req.headers.delete('skip');
      req = this.setToken(req, token);
    }
    else if (!req.headers.get("skip")) {
      req = this.setToken(req, token);
    }
    // return next.handle(req);

    return next.handle(req).pipe(catchError(err => {
      const error = err! || err.error?.message! || err.statusText!;
      if (error == 'Invalid Token') {
        console.warn(error);
        userService.removeToken();
        this._router.navigate(['/user/login'], { queryParams: { 'error': `${error}` } });
      }
      return throwError(error);
    }));
  }


  private setToken(req: HttpRequest<any>, token: string): HttpRequest<any> {

    if (!token)
      this._router.navigate(['/user/login'], { queryParams: { 'login': true } });

    return req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }



  // return next.handle(req).pipe(catchError(err => {
  //   if (err.status >= 400 && err.status <= 499) {
  //     console.error(err.err.message)
  //     this._router.navigate(['/user/login'], { queryParams: { 'error': `${err.err.messag}` } });
  //   }
  //   const error = err.error.message || err.statusText;
  //   return throwError(error);
  // }));

  // return next.handle(req).do((event: HttpEvent<any>) => {
  //   if (event instanceof HttpResponse) {
  //   }
  // }, (err: any) => {
  //   if (err instanceof HttpErrorResponse) {
  //     if (err.status === 401) {
  //         this.router.navigate(['login']);
  //     }
  //   }
  // });

  // return next.handle(req).pipe(catchError(error => {
  //   if (error! instanceof HttpErrorResponse && error?.status! === 401) {
  //     this._router.navigate(['/user/login'], { queryParams: { 'wrong': true } })
  //   } else {
  //     return throwError(error);
  //   }
  // }));



  // if (!req.headers.get("skip")) {

  //   const tokenizedReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //   return next.handle(tokenizedReq);
  // }
  // else {
  //   req.headers.delete('skip');
  //   return next.handle(req);
  // }
  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //     this.refreshTokenSubject.next(null);

  //     return this.authService.refreshToken().pipe(
  //       switchMap((token: any) => {
  //         this.isRefreshing = false;
  //         this.refreshTokenSubject.next(token.jwt);
  //         return next.handle(this.setToken(request, token.jwt));
  //       }));

  //   } else {
  //     return this.refreshTokenSubject.pipe(
  //       filter(token => token != null),
  //       take(1),
  //       switchMap(jwt => {
  //         return next.handle(this.setToken(request, jwt));
  //       }));
  //   }
  // }
}
