import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-activity',
  templateUrl: './supplier-activity.component.html',
  styleUrls: ['./supplier-activity.component.css']
})
export class SupplierActivityComponent implements OnInit {

  suppliers: any[] = [];

  constructor(private supplierService: SupplierService ,private router:Router) {}

  ngOnInit(): void {
    this.fetchSuppliers();
  }
  gotoUsers() {
    this.router.navigate(['supplier']);
  }
  fetchSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
      },
      error: (error) => {
        console.error('Error fetching suppliers:', error);
      }
    });
  }
}
