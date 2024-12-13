import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FileUploadService } from '../services/admin-file-uplad.service';
import * as Chart from 'chart.js';
import { TrendAnalysisService } from '../services/trend-analysis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aqua-trace',
  templateUrl: './aqua-trace.component.html',
  styleUrls: ['./aqua-trace.component.css'],
  animations: [
    trigger('menuAnimation', [
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
        })
      ),
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('closed <=> open', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class AquaTraceComponent implements OnInit{
  menuOpen: boolean = false;
  waterData: any[] = [];
  isModalOpen: boolean = false;


  gotoUsers() {
    this.router.navigate(['home']);
  }


  
  ngOnInit(): void {
    this.waterManagementService.getWaterManagementData().subscribe(data => {
      this.waterData = data;
    }, error => {
      console.error('Error fetching water management data', error);
    });
  }
  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  result1: any = {};
  constructor(private waterManagementService: FileUploadService,private trendsService: TrendAnalysisService ,private router : Router) { }
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
  closePopup(): void {
   
    this.showchart = false;
  }
  
}
  
