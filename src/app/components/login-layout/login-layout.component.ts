import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalConstants } from 'src/app/commons/global-constants';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginLayoutComponent implements OnInit {

  title: string = GlobalConstants.APP_NAME;

  constructor() { }

  ngOnInit(): void {
  }

}
