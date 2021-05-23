import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  status!: boolean;

  constructor() { }

  ngOnInit(): void {
    // this.status = true;
  }
}
