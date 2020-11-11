import { NgModule } from '@angular/core';
import { CashBoxListComponent } from './cash-box-list/cash-box-list.component';
import { CashBoxRoutingModule } from './cash-box-routing.module';
import { MaterialModule } from '../shared/material.module';
import { CashBoxComponent } from './cash-box.component';
import { CashBoxEditComponent } from './cash-box-edit/cash-box-edit.component';
import { CashBoxViewComponent } from './cash-box-view/cash-box-view.component';
import { BudgetPlanModule } from '../budget-plan/budget-plan.module';
import { SharedModule } from '../shared/shared.module';
import { CashBoxOverviewComponent } from './cash-box-overview/cash-box-overview.component';
import { CashBoxPlansComponent } from './cash-box-plans/cash-box-plans.component';
import { CashBoxReportComponent } from './cash-box-report/cash-box-report.component';
import { CashBoxSettingsComponent } from './cash-box-settings/cash-box-settings.component';

@NgModule({
  declarations: [
    CashBoxComponent,
    CashBoxListComponent,
    CashBoxEditComponent,
    CashBoxViewComponent,
    CashBoxOverviewComponent,
    CashBoxPlansComponent,
    CashBoxReportComponent,
    CashBoxSettingsComponent,
  ],
  imports: [
    SharedModule,
    CashBoxRoutingModule,
    MaterialModule,
    BudgetPlanModule,
  ],
})
export class CashBoxModule {}
