import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})
export class FactoryComponent implements OnInit {
  location: any;

  constructor() { }

  ngOnInit(): void {
  }
  goBack() {
    this.location.back();
  }
}
