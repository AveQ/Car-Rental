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
import { DarkModeService } from './services/darkMode.service';
import { FooterComponent } from './homepage/footer/footer.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { AddNewCarComponent } from './add-new-car/add-new-car.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FindVehicleComponent } from './find-vehicle/find-vehicle.component';
import {ScrollToModule} from 'ng2-scroll-to';
import { CheckDateComponent } from './find-vehicle/check-date/check-date.component';
import { ComparisonComponent } from './find-vehicle/comparison/comparison.component';
import { CarInformationComponent } from './find-vehicle/car-information/car-information.component';
import { EditCarComponent } from './find-vehicle/edit-car/edit-car.component';
import {FindVehicleInterceptorService} from './services/find-vehicle-interceptor.service';
import { PostReportComponent } from './add-new-car/post-report/post-report.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AccountComponent } from './account/account.component';
import { EditUsersComponent } from './admin-panel/edit-users/edit-users.component';

const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'new-car', component: AddNewCarComponent},
  {path: 'vehicles', component: FindVehicleComponent},
  {path: 'comparison', component: ComparisonComponent},
  {path: 'admin-panel', component: AdminPanelComponent},
  {path: 'account', component: AccountComponent},
  {path: 'edit-users', component: EditUsersComponent}

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
    CarInformationComponent,
    EditCarComponent,
    PostReportComponent,
    AdminPanelComponent,
    AccountComponent,
    EditUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ScrollToModule.forRoot()
  ],
  providers: [DarkModeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FindVehicleInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
