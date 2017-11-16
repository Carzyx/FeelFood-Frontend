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
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { MapComponent } from './components/map/map.component';
import { MenuComponent} from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AppNavbar } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    MapComponent,
    RestaurantComponent,
    UserComponent,
    MenuComponent,
    HomeComponent,
    AppNavbar
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutes,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAPRBVQnnkf9qptCZSrcQ2DExv5A4uzL8o'}),
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppNavbar,
    FooterComponent
  ]
})
export class AppModule { }
