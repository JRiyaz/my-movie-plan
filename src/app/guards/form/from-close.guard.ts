import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LeaveForm } from 'src/app/interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class FromCloseGuard implements CanDeactivate<LeaveForm> {
  canDeactivate(
    component: LeaveForm,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.areYouSure();
  }

}
