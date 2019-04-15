import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from '../auth.guard';
import { GlobalConstants } from '../common/model/global-constants';

const routes: Routes = [
  {
    path: GlobalConstants.Routes.UserDashboard,
    component: UserDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: GlobalConstants.Routes.UserAddEdit,
    component: UserAddEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: GlobalConstants.Routes.UserList,
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: GlobalConstants.Routes.UserDashboard,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
