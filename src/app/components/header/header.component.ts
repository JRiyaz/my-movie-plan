import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/commons/global-constants';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = GlobalConstants.APP_NAME;

  router!: Router;
  service!: UserService;

  constructor(private _router: Router,
    private _userService: UserService) { }

  ngOnInit(): void {
    console.log(this._userService.getUser());
    this.router = this._router;
    this.service = this._userService;
  }

  onLogout(): void {
    if (confirm('Do you want to logout?')) {
      if (this._userService.removeToken())
        this._router.navigate(['/user/login'], { queryParams: { 'logout': 'true' } });
    }
  }
  // constructor(@Inject(DOCUMENT) document: any) { }
  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(e: any): void {
  //   let element = document.getElementById('nav-bar');
  //   if (window.pageYOffset > 300)
  //     element?.classList.add('fixed-top');
  //   else
  //     element?.classList.remove('fixed-top');

  // }

}
