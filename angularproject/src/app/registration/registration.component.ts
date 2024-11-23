import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';  // Import the User model
import { UserService } from '../services/user.service';  // Import the UserService
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    // DOM manipulations should be done in ngAfterViewInit to ensure elements are rendered
    const signupButton = document.getElementById('signup-button');
    const loginButton = document.getElementById('login-button');
    const userForms = document.getElementById('user_options-forms');

    if (signupButton && loginButton && userForms) {
      // Add event listener to the "Sign Up" button
      signupButton.addEventListener('click', () => {
        userForms.classList.remove('bounceRight');
        userForms.classList.add('bounceLeft');
      });

      // Add event listener to the "Login" button
      loginButton.addEventListener('click', () => {
        userForms.classList.remove('bounceLeft');
        userForms.classList.add('bounceRight');
      });
    }
  }
  registrationForm: FormGroup;
  loginForm:FormGroup;

  user: User = new User();  // Initialize the user object
  
  department: string = '';
  constructor(private fb: FormBuilder, private userService: UserService ,private router:Router ,private activatedRoute: ActivatedRoute) {
    this.loginForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(3)]],
      Password:['', Validators.required],
      
    });

    this.registrationForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],  // Assuming phone number is 10 digits
      gender: ['', Validators.required],
      Password:['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],  // Assuming age should be 18 or older
    });

  

  }

  ngOnInit(): void {
    console.log("from reg")
    // Subscribe to the route parameter 'department'
    this.activatedRoute.paramMap.subscribe(params => {
      this.department = params.get('department') || ''; // Get 'department' from URL
      console.log('Department:', this.department); // You can use this value for further logic
    });
  }
  

  onSubmit(): void {
    if (this.registrationForm.valid) {
      // Assign form values to the user object
      this.user.username = this.registrationForm.get('UserName')?.value;
      this.user.email = this.registrationForm.get('email')?.value;
      this.user.phone = this.registrationForm.get('phone')?.value;
      this.user.gender = this.registrationForm.get('gender')?.value;
      this.user.age = this.registrationForm.get('age')?.value;
      this.user.password= this.registrationForm.get('Password')?.value;
      // Call the UserService to register the user
      this.userService.registerUser(this.user).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          alert('Registration Successful');
        },
        (error) => {
          console.error('Error during registration:', error);
          alert('Registration failed');
        }
      );
    } else {
      console.log('Form is invalid');
      alert('Please fill out the form correctly');
    }
  }

  onSubmitLogin() {
  
    this.user.username = this.loginForm.get('UserName')?.value;
    this.user.password = this.loginForm.get('Password')?.value;
 // Call the UserService to register the user
 console.log("login .......",  this.user.password ,this.user.username)

 this.userService.loginUser(this.user.username , this.user.password).subscribe(
  (response) => {
    console.log('User Login successfully:', response);
    alert('Login Successful');
 
    this.router.navigate([`/${this.department.toLowerCase()}`]).then((success: any) => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.error('Navigation failed');
      } });
  },
  (error) => {
    console.error('Error during Login:', error);
    alert('Login failed');
  }
);
  }


}
