import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private uploadUrl = 'http://localhost:8080/api/water-management'; // Backend endpoint

  constructor(private http: HttpClient) {}
  uploadCSV(file: File): Observable<any> {
    console.log(file)
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.uploadUrl+"/upload", formData, {
      headers: new HttpHeaders(),
      responseType: 'text', // Adjust as per your backend response
    });
  }
  getWaterManagementData(): Observable<any> {
    return this.http.get<any>(this.uploadUrl+"/data");
  }

  getChartData(): Observable<any> {
    return this.http.get<any>(this.uploadUrl+"/upload1");
  }
}
