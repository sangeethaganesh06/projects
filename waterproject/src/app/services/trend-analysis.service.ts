import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendAnalysisService {

  private apiUrl = 'http://localhost:8080/Aqua-Trends-Trace';

  constructor(private http: HttpClient) {}

  getSeasonalTrends(season: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/trends/seasonal?season=${season}`);
  }

  getSectorTrends(sector: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/trends/sector?sector=${sector}`);
  }

 
  getYearlyTrends(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trends/yearly`);
  }
  getWaterSourceTrends(waterSource: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/trends/water-source?waterSource=${waterSource}`);
  }
}