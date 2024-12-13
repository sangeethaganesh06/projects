import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { QualityComponent } from './quality/quality.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AdminComponent } from './admin/admin.component';
import { AdminActivityComponent } from './admin-activity/admin-activity.component';
import { WaterQualityFormComponent } from './water-quality-form/water-quality-form.component';
import { QualityMatricsComponent } from './quality-matrics/quality-matrics.component';
import { AquaTraceComponent } from './aqua-trace/aqua-trace.component';
import { TrendAnalysisComponent } from './trend-analysis/trend-analysis.component';
import { ForecastComponent } from './forecast/forecast.component';
import { SupplierActivityComponent } from './supplier-activity/supplier-activity.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registration/:department', component: RegistrationComponent },
   { path: 'registration/:department', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'quality', component: QualityComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'aquatrace', component: AquaTraceComponent },
  { path: 'activity', component: AdminActivityComponent },
  { path: 'predict', component: WaterQualityFormComponent },
  { path:'trendanalysis',component: TrendAnalysisComponent },
  { path:'qualityMeasures',component: QualityMatricsComponent },
  { path:'futureforecast',component: ForecastComponent },
  { path:'qualityMeasures',component: QualityMatricsComponent },
  
  { path:'supplieractivity',component: SupplierActivityComponent },
  

  // Add a catch-all route to handle invalid routes
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
