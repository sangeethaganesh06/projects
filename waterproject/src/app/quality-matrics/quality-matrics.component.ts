import { Component, OnInit } from '@angular/core';
import { QualityServiceService } from '../services/quality-service.service';
import{Chart} from 'chart.js' ;
import { Router } from '@angular/router';
@Component({
  selector: 'app-quality-matrics',
  templateUrl: './quality-matrics.component.html',
  styleUrls: ['./quality-matrics.component.css']
})
export class QualityMatricsComponent implements OnInit {

  waterQualityData: any[] = [];
  objectKeys = Object.keys;
  constructor(private waterQualityService: QualityServiceService,private router:Router) {}

  ngOnInit(): void {
    this.loadWaterQualityData(); 

  }
  gotoUsers() {
    this.router.navigate(['quality']);
  }
  loadWaterQualityData(): void {
    this.waterQualityService.getWaterQualityData().subscribe({
      next: (data) => {
        this.waterQualityData = data;
        console.log('Water Quality Data:', this.waterQualityData);
      },
      error: (err) => {
        console.error('Error fetching water quality data:', err);
      }
    });
  }
  getRiskLevelColor(riskLevel: string): string {
    switch (riskLevel) {
      case 'Low':
        return '#43a047'; // Green
      case 'Moderate':
        return '#ffa000'; // Orange
      case 'High':
        return '#e53935'; // Red
      default:
        return '#000'; // Default color if no match
    }
  }
}
