import { NgModule } from '@angular/core';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserAddEditComponent,
    UserListComponent
  ],
  imports: [
    UserRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class UserModule { }
