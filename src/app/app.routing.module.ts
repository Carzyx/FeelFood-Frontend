import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementComponent } from './components/management/management.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';

export const Router: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'profile', component: UserComponent},
  { path: 'restaurantProfile', component: RestaurantComponent}
];
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(Router);
