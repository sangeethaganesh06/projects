import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { QualityComponent } from './quality/quality.component';
import { SupplierComponent } from './supplier/supplier.component';
import { UrbanComponent } from './urban/urban.component';
import { AdminComponent } from './admin/admin.component';
import { FactoryComponent } from './factory/factory.component';
import { AdminActivityComponent } from './admin-activity/admin-activity.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registration/:department', component: RegistrationComponent },
   { path: 'registration/:department', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'quality', component: QualityComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'urban', component: UrbanComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'factory', component: FactoryComponent },
  { path: 'activity', component: AdminActivityComponent },

  
  // Add a catch-all route to handle invalid routes
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
