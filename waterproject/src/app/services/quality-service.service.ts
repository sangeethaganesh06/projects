import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QualityServiceService {



  private baseUrl = 'http://localhost:8080/api/water-quality';

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8080/api/water-quality';  // Change to your backend URL

  recommendTreatment(waterQualityData: any): Observable<string> {
    return this.http.post<string>(this.apiUrl+"/recommendTreatment", waterQualityData, { responseType: 'text' as 'json' });
  }
 
  predictWaterQuality(waterQualityData: any): Observable<string> {
    return this.http.post<string>(this.apiUrl+"/predictWaterQuality", waterQualityData, { responseType: 'text' as 'json' });
  }
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType:  'text' as 'json' });
  }

  getWaterQualityData(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/api/water-quality/complete-data");
  }

}
