import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutUsComponent } from './homepage/about-us/about-us.component';
import { AuthComponent } from './auth/auth.component';
import { SigninDynamicComponent } from './auth/signin-dynamic/signin-dynamic.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DarkModeService } from './darkMode.service';
import { FooterComponent } from './homepage/footer/footer.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { AddNewCarComponent } from './add-new-car/add-new-car.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    AboutUsComponent,
    AuthComponent,
    SigninDynamicComponent,
    FooterComponent,
    LocalisationComponent,
    AddNewCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DarkModeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
