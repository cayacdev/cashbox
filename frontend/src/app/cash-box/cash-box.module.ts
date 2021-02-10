import { NgModule } from '@angular/core';
import { CashBoxListComponent } from './components/cash-box-list/cash-box-list.component';
import { CashBoxRoutingModule } from './cash-box-routing.module';
import { MaterialModule } from '../shared/material.module';
import { CashBoxComponent } from './cash-box.component';
import { CashBoxEditComponent } from './components/cash-box-edit/cash-box-edit.component';
import { CashBoxViewComponent } from './components/cash-box-view/cash-box-view.component';
import { BudgetPlanModule } from '../budget-plan/budget-plan.module';
import { SharedModule } from '../shared/shared.module';
import { CashBoxOverviewComponent } from './components/cash-box-overview/cash-box-overview.component';
import { CashBoxPlansComponent } from './components/cash-box-plans/cash-box-plans.component';
import { CashBoxReportComponent } from './components/cash-box-report/cash-box-report.component';
import { CashBoxSettingsComponent } from './components/cash-box-settings/cash-box-settings.component';

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
