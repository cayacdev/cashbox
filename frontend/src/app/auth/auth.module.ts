import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [SharedModule, AuthRoutingModule, MaterialModule],
  exports: [RouterModule],
})
export class AuthModule {}
