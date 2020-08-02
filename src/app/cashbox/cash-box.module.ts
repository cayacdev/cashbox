import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CashBoxDeleteDialogComponent,
  CashBoxListComponent,
} from './cash-box-list/cash-box-list.component';
import { CashBoxRoutingModule } from './cash-box-routing.module';
import { MaterialModule } from '../shared/material.module';
import { CashBoxComponent } from './cash-box.component';
import { CashBoxEditComponent } from './cash-box-edit/cash-box-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CashBoxViewComponent } from './cash-box-view/cash-box-view.component';

@NgModule({
  declarations: [
    CashBoxComponent,
    CashBoxListComponent,
    CashBoxEditComponent,
    CashBoxDeleteDialogComponent,
    CashBoxViewComponent,
  ],
  imports: [
    CommonModule,
    CashBoxRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class CashBoxModule {}
