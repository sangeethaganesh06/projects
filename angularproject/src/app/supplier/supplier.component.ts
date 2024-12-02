import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SupplierService } from '../services/supplier.service';
interface ResourceData {
  totalCollectionCapacity: number;
  totalSupplyCapacity: number;
  averageEfficiency: number;
}

export interface SupplierPerformance {
  PerformanceEfficiency: number;
  StorageEfficiency: number;
  CollectedWater: number;
  SuppliedWater: number;
}

export interface PerformanceData {
  [supplierName: string]: SupplierPerformance;
}

@Component({
  selector: 'app-supplier',

  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})

export class SupplierComponent implements OnInit {
  activeTab: string = ''; // Keep track of the active tab (resource or performance)
  isLoading: boolean = false; // Loading indicator
  resourceEfficiency: { [key: string]: ResourceData } = {}; // Store resource efficiency data
  uploadButton: boolean = false; // Toggle upload section visibility
  uploadButton1: boolean = false; // Toggle data section visibility
  file: File | null = null; // File to be uploaded
  isModalOpen: boolean = false; // Flag to control modal visibility
  isModalOpen1: boolean = false; // Flag to control modal visibility
  performanceData: PerformanceData = {};
 
   // Getter for object keys
   get objectKeys() {
    return Object.keys(this.resourceEfficiency);
  }
  constructor(
    private fileUploadService: SupplierService,
    private router: Router
  ) {}
 // Toggles visibility of upload section
 button(show: boolean): void {
  this.uploadButton = show;
}

 // Toggles visibility of data section
 button1(show: boolean): void {
  this.uploadButton1 = show;
}

// Navigate to Activity page
gotoUsers() {
  this.router.navigate(['activity']);
}
   // Modal control functions
   showModal(): void {
    this.isModalOpen = true; // Show the modal for resource data
    this.isModalOpen1 = false; // Close performance modal
  }

  showModal1(): void {
    this.isModalOpen1 = true; // Show the modal for performance data
    this.isModalOpen = false; // Close resource modal
  }

  closeModal(): void {
    this.isModalOpen = false; // Close resource modal
  }

  closeModal1(): void {
    this.isModalOpen1 = false; // Close performance modal
  }

   
    // Handles tab switching and data fetching
  showData(tab: string): void {
    this.activeTab = tab; // Set the active tab
    this.isLoading = true; // Show loading spinner (if necessary)

    if (tab === 'resource') {
      this.fetchResourceData(); // Fetch resource data
    } else if (tab === 'performance') {
     this. fetchPerformanceData()
    }
  }


  fetchResourceData(): void {
    this.fileUploadService.getResourceEfficiency().subscribe(
      (data) => {
        this.resourceEfficiency = data;
        this.isLoading = false; // Hide loading spinner
      },
      (error) => {
        console.error('Error fetching resource data:', error);
        this.isLoading = false; // Hide loading spinner on error
      }
    );
  }

  fetchPerformanceData(): void {
    this.fileUploadService.getPerformanceEfficiency().subscribe(
      (data: PerformanceData) => {
        this.performanceData = data;
        console.log('Performance Data from API:', this.performanceData);
  
        this.isLoading = false; // Hide loading spinner
      },
      (error) => {
        console.error('Error fetching performance data:', error);
        this.isLoading = false; // Hide loading spinner on error
      }
    );
  }

  submitPerformanceData(): void {
    const formattedData = Object.entries(this.performanceData).map(([supplierName, details]) => ({
      supplierName,
      collectedWater: details.CollectedWater,
      suppliedWater: details.SuppliedWater,
      storageEfficiency: details.StorageEfficiency,
      performanceEfficiency: details.PerformanceEfficiency,
    }));

    
    
    this.fileUploadService.submitPerformanceData(formattedData).subscribe(
      (response) => {
        console.log('Data submitted successfully:', response);
        alert('Performance data submitted to the database!');
      },
      (error) => {
        console.error('Error submitting performance data:', error);
        alert('Failed to submit performance data.');
      }
    );
  }  
    selectedFile: File | null = null;
   
  
    ngOnInit(): void {
      this.fetchPerformanceData();
    }
    
  
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
  
   
  
    uploadFile(): void {
      if (this.file) {
        this.fileUploadService.uploadCSV(this.file).subscribe({
          next: (response) => alert('File uploaded successfully!'),
          error: (error) => alert('Failed to upload file: ' + error.message),
        });
      }
    }
}