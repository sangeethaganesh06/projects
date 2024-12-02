import { Component, OnInit } from '@angular/core';
import { QualityServiceService } from '../services/quality-service.service';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css']
})
export class QualityComponent implements OnInit {
 
  file: File | null = null; // Holds the selected file
  message: string | null = null; // Success or error message

  constructor(private qualityService: QualityServiceService) {}

  ngOnInit(): void {}

  // Show the file upload frame
  showUploadFrame(): void {
    const uploadFrame = document.getElementById('uploadFrame');
    if (uploadFrame) {
      uploadFrame.style.display = 'flex'; // Show the overlay and file input
    }
  }

  // Handle file selection
  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.file = inputElement?.files ? inputElement.files[0] : null;

    if (this.file) {
      if (this.file.type !== 'text/csv') {
        alert('Please upload a CSV file!');
        this.file = null; // Reset file if invalid
      } else {
        alert(`File "${this.file.name}" selected successfully!`);
      }
    }
  }

  // Upload the selected file
  uploadFile(): void {
    if (!this.file) {
      alert('No file selected. Please select a CSV file to upload.');
      return;
    }

    this.qualityService.uploadFile(this.file).subscribe(
      (response) => {
        this.message = 'File uploaded successfully!';
        alert(this.message); // Optional: Display a message to the user
        this.file = null; // Reset file after successful upload
        this.closeUploadFrame(); // Close the upload frame
      },
      (error) => {
        this.message = 'Failed to upload file. Please try again.';
        console.error('Error:', error);
        alert(this.message); // Optional: Notify the user of an error
      }
    );
  }

  // Close the file upload frame
  closeUploadFrame(): void {
    const uploadFrame = document.getElementById('uploadFrame');
    if (uploadFrame) {
      uploadFrame.style.display = 'none';
    }
  }
}