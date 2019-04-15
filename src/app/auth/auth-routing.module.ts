import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AnonymousGuardGuard } from '../anonymous-guard.guard';
import { GlobalConstants } from '../common/model/global-constants';

const routes: Routes = [
  {
    path: GlobalConstants.Routes.login,
    component: LoginComponent,
    canActivate: [AnonymousGuardGuard]
  },
  {
    path: GlobalConstants.Routes.register,
    component: RegisterComponent,
    canActivate: [AnonymousGuardGuard]
  },
  {
    path: '**',
    redirectTo: GlobalConstants.Routes.login,
    pathMatch: 'full',
    canActivate: [AnonymousGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
