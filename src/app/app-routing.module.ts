import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalConstants } from './common/model/global-constants';

const routes: Routes = [
  {
    path: GlobalConstants.Routes.auth,
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: GlobalConstants.Routes.user,
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: '**',
    redirectTo: GlobalConstants.Routes.auth
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
