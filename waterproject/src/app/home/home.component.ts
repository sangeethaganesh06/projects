import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  location: any;

  ngOnInit(): void {
  }
  constructor(private router: Router) {}

  navigateTo(module: string) {
    this.router.navigate([module]);
  }
  goBack() {
    this.location.back();
  }

}
