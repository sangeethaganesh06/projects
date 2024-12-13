import { Component, OnInit } from '@angular/core';
import { TrendAnalysisService } from '../services/trend-analysis.service';
import * as Chart from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trend-analysis',
  templateUrl: './trend-analysis.component.html',
  styleUrls: ['./trend-analysis.component.css']
})
export class TrendAnalysisComponent implements OnInit {
// Dropdown Options
seasonalOptions = ['Autumn', 'Winter', 'Summer', 'Spring'];
sectorOptions = ['Industrial', 'Urban', 'Commercial','Power Gen'];
waterSourceOptions = ['Rainwater Harvesting','Surface Water','Reservoir' ,'River Water', 'Groundwater', 'Recycled Water'];

// Variables
selectedTrend: string = ''; // Tracks which trend is selected
selectedSeason: string = '';
selectedSector: string = '';
selectedWaterSource: string = '';
gotoUsers() {
  this.router.navigate(['aquatrace']);
}
result1: any = {};
result: any = {}; // Stores the result to display in the popup
showPopup: boolean = false; // Controls popup visibility

constructor(private trendsService: TrendAnalysisService ,private router :Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
// Open Dropdown Based on Button Click
openDropdown(trend: string): void {
  this.selectedTrend = trend; 
}
// Bar Chart Configuration
barChartLabels: string[] = []; // Year labels
barChartData: any[] = []; // Data for the chart
barChartOptions = {
  responsive: true,
  scales: {
    y: { beginAtZero: true }
  }
};
barChartLegend = true;
barChartType = 'bar';



// API Calls
getSeasonalTrends(): void {
  this.trendsService.getSeasonalTrends(this.selectedSeason).subscribe(data => {
    this.result = data;
    this.showPopup = true;
  });
}

getSectorTrends(): void {
  this.trendsService.getSectorTrends(this.selectedSector).subscribe(data => {
    this.result = data;
    this.showPopup = true;
  });
}
showchart:boolean =false;
getYearlyTrends(): void {
  this.showchart=true ;
  this.trendsService.getYearlyTrends().subscribe(data => {
    this.result1 = data;
   
    
    this.showChart();
  });
}

showChart() {
  this.showchart = true;
 
  setTimeout(() => {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (!ctx) {
      console.error('Failed to acquire context. Canvas element might be missing or not ready.');
      return;
    }

    const data = this.result1 || [];

    const labels = data.map((item: any) => item.year);
    const totalConsumedData = data.map((item: any) => item.totalConsumed);
    const totalRecycledData = data.map((item: any) => item.totalRecycled);
    const totalSavingsData = data.map((item: any) => item.totalSavings);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total Consumed',
            data: totalConsumedData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Green
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Total Recycled',
            data: totalRecycledData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Total Savings',
            data: totalSavingsData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'top'
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Year' // Title for x-axis
              }
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Values' // Title for y-axis
              }
            }
          ]
        }
      }
    });
  }, 0);
}


getWaterSourceTrends(): void {
  this.trendsService.getWaterSourceTrends(this.selectedWaterSource).subscribe(data => {
    this.result = data;
    this.showPopup = true;
  });
}

// Close Popup
closePopup(): void {
  this.showPopup = false;
  this.showchart = false;
}
}