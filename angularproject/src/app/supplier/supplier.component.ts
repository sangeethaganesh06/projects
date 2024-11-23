import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  gotoUsers() {
    this.router.navigate(['activity']);
  }
    file: File | null = null;
   // Toggle the visibility of the upload form
   button(show: boolean) {
    this.uploadButton = show;
  }
  goto(){
    
  }
    selectedFile: File | null = null;
    uploadButton: boolean = false;
    constructor(
      private fileUploadService : SupplierService ,
      private router: Router,
    
    ) {}
  
    ngOnInit(): void {}
  
    // Handle the file selection
    onFileChange(event: any): void {
      this.selectedFile = event.target.files[0];
    }
  
    onFileSelect(event: any): void {
      const selectedFile = event.target.files[0];
      if (selectedFile && selectedFile.type === 'text/csv') {
        this.file = selectedFile;
      } else {
        alert('Please select a valid CSV file.');
        this.file = null;
      }
    }
  
    // Navigate to the registration page
    navigateToRegistration() {
      this.router.navigate(['admin']);
    }
  
    // Go back to the previous page
    goBack() {
      
    }
  
  
    uploadFile(): void {
      if (this.file) {
        this.fileUploadService.uploadCSV(this.file).subscribe({
          next: (response) => alert('File uploaded successfully!'),
          error: (error) => alert('Failed to upload file: ' + error.message),
        });
      }
    }
}
