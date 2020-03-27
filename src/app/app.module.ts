import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
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
import { FindVehicleComponent } from './find-vehicle/find-vehicle.component';
import {ScrollToModule} from 'ng2-scroll-to';
import { CheckDateComponent } from './find-vehicle/check-date/check-date.component';
import { ComparisonComponent } from './find-vehicle/comparison/comparison.component';
import { CarInformationComponent } from './find-vehicle/car-information/car-information.component';

const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'new-car', component: AddNewCarComponent},
  {path: 'vehicles', component: FindVehicleComponent},
  {path: 'comparison', component: ComparisonComponent}
];

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
    AddNewCarComponent,
    FindVehicleComponent,
    CheckDateComponent,
    ComparisonComponent,
    CarInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ScrollToModule.forRoot()
  ],
  providers: [DarkModeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
