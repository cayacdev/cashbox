import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashBoxListComponent } from './cash-box-list/cash-box-list.component';
import { CashBoxRoutingModule } from './cash-box-routing.module';
import { MaterialModule } from '../shared/material.module';
import { CashBoxComponent } from './cash-box.component';
import { CashBoxEditComponent } from './cash-box-edit/cash-box-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CashBoxComponent, CashBoxListComponent, CashBoxEditComponent],
  imports: [
    CommonModule,
    CashBoxRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class CashBoxModule {}
