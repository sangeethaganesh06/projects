import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerformanceData } from '../supplier/supplier.component';
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
  getResourceEfficiency(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/api/supplier/calculate-resource-efficiency"); // Make sure this endpoint is correct
  }

  getPerformanceEfficiency(): Observable<PerformanceData> {
    return this.http.get<PerformanceData>('http://localhost:8080/api/supplier/calculate-performance-efficiency');
  }
 
  submitPerformanceData(data: any[]): Observable<any> {
    return this.http.post('http://localhost:8080/api/supplier/submit-performance-data', data, { responseType:  'text' as 'json'});
  }
  
}