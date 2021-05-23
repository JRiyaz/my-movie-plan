import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/commons/global-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {

  title: string = GlobalConstants.APP_NAME;

  router!: Router;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.router = this._router;
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
