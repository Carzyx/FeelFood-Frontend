import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AppRoutes } from './app.routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

/*Import app Components*/
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { RestaurantSummaryComponent } from './components/restaurant/restaurantSummary/restaurantSummary.component';
import { RestaurantServicesComponent } from './components/restaurant/restaurantServices/restaurantServices.component';
import { MapComponent } from './components/map/map.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { RestaurantProfileComponent } from './components/restaurantProfile/restaurantProfile.component';
import { DishComponent } from './components/dish/dish.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AppNavbar } from './shared/navbar/navbar.component';
import { AuthFbComponent } from './components/authFb/authFb.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/authentication/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    MapComponent,
    RestaurantSummaryComponent,
    RestaurantServicesComponent,
    UserComponent,
    MenuComponent,
    HomeComponent,
    RestaurantProfileComponent,
    DishComponent,
    AppNavbar,
    AuthFbComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutes,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAPRBVQnnkf9qptCZSrcQ2DExv5A4uzL8o'
    }),
    FormsModule
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard],
  bootstrap: [
    AppNavbar,
    FooterComponent
  ]
})
export class AppModule { }
