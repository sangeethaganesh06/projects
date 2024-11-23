import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {

 
  private uploadUrl = 'http://localhost:8080/api/supplier/supplier-upload'; // Backend endpoint

  constructor(private http: HttpClient) {}
  uploadCSV(file: File): Observable<any> {
    
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.uploadUrl, formData, {
      headers: new HttpHeaders(),
      responseType: 'text', // Adjust as per your backend response
    });
  }


  getChartData(): Observable<any> {
    return this.http.get<any>(this.uploadUrl);
  }
}
