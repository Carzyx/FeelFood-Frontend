import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementComponent } from './components/management/management.component';
import { LoginComponent } from './components/login/login.component';

export const Router: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'management', component: ManagementComponent }
];
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(Router);
