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


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'new-car', component: AddNewCarComponent},
  {path: 'vehicles', component: FindVehicleComponent},
  {path: 'comparison', component: ComparisonComponent},
  {path: 'admin-panel', component: AdminPanelComponent},
  {path: 'account', component: AccountComponent},
  {path: 'edit-users', component: EditUsersComponent},
  {path: 'statistics', component: ChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
