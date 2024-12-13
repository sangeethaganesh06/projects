
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';  // Make sure to define the User model

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

 

  private apiUrl = 'http://localhost:8080/api/users';  // URL of the Spring Boot backend

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    console.log("from service");
    return this.http.post<User>(this.apiUrl+"/register", user);
  }
  loginUser(name: string, password: string): Observable<User> {
    const loginData = { username: name, password: password };
    console.log('Login data:', loginData);  // Check the request body in registration.component.ts

    return this.http.post<User>(this.apiUrl + "/login", loginData);
  }


  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/list");
  }
 // Method to send an email
 sendEmail(userId: string, email: string,password:string): Observable<any> {
  const emailData = {
   id: userId,
    email: email,
    password :password 
  };
console.log(emailData) ;
  // Assuming the POST request needs both userId and email in the body
  return this.http.post(`${this.apiUrl}/send-email`, emailData ,{ responseType: 'text' as 'json' });
}
  deleteUser(id: string): Observable<any> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`, { responseType: 'text' as 'json' });
  }

  
}
