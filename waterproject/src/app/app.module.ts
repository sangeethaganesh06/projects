import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { QualityComponent } from './quality/quality.component';
import { SupplierComponent } from './supplier/supplier.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminActivityComponent } from './admin-activity/admin-activity.component';
import { WaterQualityFormComponent } from './water-quality-form/water-quality-form.component';
import { QualityMatricsComponent } from './quality-matrics/quality-matrics.component';
import { AquaTraceComponent } from './aqua-trace/aqua-trace.component';
import { TrendAnalysisComponent } from './trend-analysis/trend-analysis.component';
import { ForecastComponent } from './forecast/forecast.component';
import { SupplierActivityComponent } from './supplier-activity/supplier-activity.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   AdminComponent,
    QualityComponent,
    SupplierComponent,
  
    RegistrationComponent,
    LoginComponent,
    AdminActivityComponent,
    WaterQualityFormComponent,
    QualityMatricsComponent,
    AquaTraceComponent,
    TrendAnalysisComponent,
    ForecastComponent,
    SupplierActivityComponent,
    
 
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,  // Use AppRoutingModule for routing configuration
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule  ,
    ReactiveFormsModule  ,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
