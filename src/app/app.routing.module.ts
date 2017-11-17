import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import {AuthComponent} from './components/auth/auth.component';

export const Router: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'home/restaurantProfile', redirectTo: '/restaurantProfile', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'userProfile', component: UserComponent},
  { path: 'restaurantProfile', component: RestaurantComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'home', component: HomeComponent},
  { path: 'auth/:token', component: AuthComponent}
];
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(Router);
