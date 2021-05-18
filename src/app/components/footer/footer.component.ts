import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FooterComponent implements OnInit {

  @Input() fixed!: boolean;

  @Input() bgColor!: string;

  @Input() textColor!: string;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
