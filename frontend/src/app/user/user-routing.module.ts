import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { authGuard } from '../auth/auth.guard'
import { MyAccountComponent } from './my-account/my-account.component'

const routes: Routes = [
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [authGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
