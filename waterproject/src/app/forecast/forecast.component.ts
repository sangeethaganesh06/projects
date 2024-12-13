import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  predictionForm!: FormGroup;
  predictionResult: any;
  showModal: boolean = false; // To control the prediction form modal visibility
  showRainfallModal: boolean = false; // To control the rainfall results modal visibility
  currentPredictionType: string = ''; // Tracks the active prediction type
showRecycledModal: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient ,private router : Router) {}

  ngOnInit(): void {
    this.predictionForm = this.fb.group({
      season: ['', Validators.required],
      region: ['', Validators.required],
      year: ['', Validators.required],
    });
  }
  gotoUsers() {
    this.router.navigate(['home']);
  }

  // Handle form submission
  onSubmit(): void {
    if (this.predictionForm.valid) {
      const { season, region, year } = this.predictionForm.value;

      const predictionType = this.currentPredictionType.toLowerCase();
      if (predictionType === 'consumption') {
        this.http.post<any>(
          `http://localhost:8080/water-management/predict-${predictionType}`,
          { season, region, year }
        ).subscribe(result => {
          this.predictionResult = result;
          this.showModal = true; // Keep modal open to show consumption results
        });
      } else if (predictionType === 'rainfall') {
        this.http.get<any>(
          `http://localhost:8080/water-management/predict-${predictionType}?season=${season}&region=${region}&year=${year}`
        ).subscribe(result => {
          this.predictionResult = result;
          this.showRainfallModal = true; // Open rainfall modal
          this.showModal = false; // Close the main modal
        });
      }

      else if (predictionType === 'recycling') {
        this.http.get<any>(
          `http://localhost:8080/water-management/predict-${predictionType}?season=${season}&region=${region}&year=${year}`
        ).subscribe(result => {
          console.log(result) ;
          this.predictionResult = result;
          this.showRecycledModal = true; // Open rainfall modal
          this.showModal = false; // Close the main modal
        });
      }
    }
  }

  // Open modal for prediction input
  openModal(predictionType: string): void {
    this.currentPredictionType = predictionType;
    this.showModal = true; // Open modal for inputs
    this.predictionForm.reset(); // Reset form when opening modal
  }

  // Close the main modal
  closeModal(): void {
    this.showModal = false; // Close modal
    this.predictionResult = null; // Reset the result
    
this.showRecycledModal=false;
  }
 
  // Close the rainfall results modal
  closeRainfallModal(): void {
    this.showRainfallModal = false; // Close rainfall modal
    this.predictionResult = null; // Reset rainfall result
  }
}
