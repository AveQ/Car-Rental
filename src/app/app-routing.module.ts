import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {AddNewCarComponent} from './add-new-car/add-new-car.component';
import {FindVehicleComponent} from './find-vehicle/find-vehicle.component';
import {ComparisonComponent} from './find-vehicle/comparison/comparison.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AccountComponent} from './account/account.component';
import {EditUsersComponent} from './admin-panel/edit-users/edit-users.component';
import {ChartComponent} from './find-vehicle/chart/chart.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './services/auth-guard.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'new-car', canActivate: [AuthGuardAdmin], component: AddNewCarComponent},
  {path: 'vehicles', component: FindVehicleComponent},
  {path: 'comparison', component: ComparisonComponent},
  {path: 'admin-panel', canActivate: [AuthGuardAdmin], component: AdminPanelComponent},
  {path: 'account', canActivate: [AuthGuard], component: AccountComponent},
  {path: 'edit-users', canActivate: [AuthGuardAdmin], component: EditUsersComponent},
  {path: 'statistics', component: ChartComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
