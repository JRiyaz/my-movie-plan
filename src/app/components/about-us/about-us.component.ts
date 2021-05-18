import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/commons/global-constants';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  title: string = GlobalConstants.APP_NAME;

  constructor() { }

  ngOnInit(): void {
  }

}
