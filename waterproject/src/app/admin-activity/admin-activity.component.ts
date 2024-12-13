import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-activity',
  templateUrl: './admin-activity.component.html',
  styleUrls: ['./admin-activity.component.css']
})
export class AdminActivityComponent implements OnInit {
  users: any[] = []; 
  constructor(private userService : UserService , private router: Router,) { }
  gotoUsers() {
    this.router.navigate(['home']);
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;  // Assign the fetched data to the users array
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  
  updateUser(userId: string,email:string,password:string) {

    console.log('User ID:', userId);
    console.log('User Email:', email);
    // Make a call to your backend to send the email
    this.userService.sendEmail(userId,email,password).subscribe(
      (response) => {
        console.log('Email sent successfully:', response);
        alert('Email sent successfully to the user!');
      },
      (error) => {
        console.error('Error sending email:', error);
        alert('Error sending email.');
      }
    );
  }
  
  // Delete method (calls the delete API with the user id)
  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        (response) => {
          alert('User deleted successfully');
          this.ngOnInit(); // Reload the user list after deletion
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

}
