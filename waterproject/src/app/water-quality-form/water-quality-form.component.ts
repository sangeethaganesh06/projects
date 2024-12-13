import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QualityServiceService } from '../services/quality-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-water-quality-form',
  templateUrl: './water-quality-form.component.html',
  styleUrls: ['./water-quality-form.component.css']
})
export class WaterQualityFormComponent implements OnInit {
  waterQualityForm!: FormGroup;
  prediction: string | null = null;
  treatment: string | null = null;

  constructor(
    private fb: FormBuilder,
    private waterQualityService: QualityServiceService,
    private router:Router 
  ) { }
  gotoUsers() {
    this.router.navigate(['quality']);
  }
  ngOnInit(): void {
    this.waterQualityForm = this.fb.group({
      waterSource: ['', Validators.required],
      location: ['', Validators.required],
      temperature: [null, Validators.required],
      turbidity: [null, Validators.required],
      phLevel: [null, Validators.required],
      dissolvedOxygen: [null, Validators.required],
      chlorineLevels: [null, Validators.required],
      nitrates: [null, Validators.required],
      heavyMetals: [null, Validators.required],
      tds: [null, Validators.required],
      ammonia: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.waterQualityForm.valid) {
      const waterQualityData = this.waterQualityForm.value;
  
      this.waterQualityService.predictWaterQuality(waterQualityData).subscribe((response: string) => {
        this.prediction = response;
        // You can split or format the prediction string if needed
        alert( this.prediction);
        this.recommendTreatment() ;
        console.log(this.prediction);
      });

     
     
    }
  }
  recommendTreatment(){
    if (this.waterQualityForm.valid) {
      const waterQualityData = this.waterQualityForm.value;
  
    this.waterQualityService.recommendTreatment(waterQualityData).subscribe((response: string) => {
      this.treatment = response;
      // You can split or format the prediction string if needed
      alert( this.treatment);
     
      console.log(this.treatment);
    });
  }
  }
}
