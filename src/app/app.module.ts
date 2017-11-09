import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutes } from './app.routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

/*Import app Components*/
import { ManagementComponent } from './components/management/management.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AppNavbar } from './shared/navbar/navbar.component'

@NgModule({
  declarations: [
    AppComponent,
    ManagementComponent,
    LoginComponent,
    FooterComponent,
    AppNavbar    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutes
  ],
  providers: [],
  bootstrap: [
    AppNavbar,
    FooterComponent  
  ]
})
export class AppModule { }
