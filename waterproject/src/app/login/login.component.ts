import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  SignIn: FormGroup;

  constructor(private router: Router ) {
    // Initialize the form with validation rules
    this.SignIn = new FormGroup({
      UserName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }
  gotoUsers() {
    this.router.navigate(['home']) ;
    }
  ngOnInit(): void {}

  // Function to handle login form submission
  onLogin() {
    const username = this.SignIn.get('UserName')?.value;
    const password = this.SignIn.get('password')?.value;

    // Check credentials
    if (username === 'admin' && password === 'admin') {
      alert('Login successful!');
      // You can navigate to another page after successful login if needed
      this.router.navigate(['admin']); // change 'dashboard' to your desired route
    } else {
      alert('Incorrect username or password. Please try again.');
    }
  }
}
