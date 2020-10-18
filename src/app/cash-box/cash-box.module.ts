import { NgModule } from '@angular/core';
import { CashBoxListComponent } from './cash-box-list/cash-box-list.component';
import { CashBoxRoutingModule } from './cash-box-routing.module';
import { MaterialModule } from '../shared/material.module';
import { CashBoxComponent } from './cash-box.component';
import { CashBoxEditComponent } from './cash-box-edit/cash-box-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CashBoxViewComponent } from './cash-box-view/cash-box-view.component';
import { BudgetPlanModule } from '../budget-plan/budget-plan.module';
import { SharedModule } from '../shared/shared.module';
import { CashBoxOverviewComponent } from './cash-box-overview/cash-box-overview.component';
import { CashBoxPlansComponent } from './cash-box-plans/cash-box-plans.component';

@NgModule({
  declarations: [
    CashBoxComponent,
    CashBoxListComponent,
    CashBoxEditComponent,
    CashBoxViewComponent,
    CashBoxOverviewComponent,
    CashBoxPlansComponent,
  ],
  imports: [
    SharedModule,
    CashBoxRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BudgetPlanModule,
  ],
})
export class CashBoxModule {}
