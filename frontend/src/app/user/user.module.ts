import { NgModule } from '@angular/core';
import { MyAccountComponent } from './my-account/my-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [MyAccountComponent, ChangePasswordComponent],
  imports: [SharedModule, MaterialModule, UserRoutingModule],
})
export class UserModule {}
