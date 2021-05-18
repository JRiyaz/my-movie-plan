import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/commons/global-constants';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  title: string = GlobalConstants.APP_NAME;

  constructor() { }

  ngOnInit(): void {
  }

}
