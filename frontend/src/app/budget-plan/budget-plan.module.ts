import { NgModule } from '@angular/core';
import { BudgetPlanViewComponent } from './budget-plan-view/budget-plan-view.component';
import { BudgetPlanListComponent } from './budget-plan-list/budget-plan-list.component';
import { BudgetPlanEditComponent } from './budget-plan-edit/budget-plan-edit.component';
import { RouterModule } from '@angular/router';
import { BudgetPlanRoutingModule } from './budget-plan-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BudgetPlanEntryDialogComponent } from './budget-plan-entry-dialog/budget-plan-entry-dialog.component';
import { BudgetPlanChartComponent } from './budget-plan-chart/budget-plan-chart.component';
import { ChartsModule } from 'ng2-charts';
import { BudgetPlanReportComponent } from './budget-plan-report/budget-plan-report.component';

@NgModule({
  declarations: [
    BudgetPlanViewComponent,
    BudgetPlanListComponent,
    BudgetPlanEditComponent,
    BudgetPlanEntryDialogComponent,
    BudgetPlanChartComponent,
    BudgetPlanReportComponent,
  ],
  imports: [SharedModule, RouterModule, BudgetPlanRoutingModule, ChartsModule],
  exports: [
    BudgetPlanViewComponent,
    BudgetPlanListComponent,
    BudgetPlanReportComponent,
  ],
})
export class BudgetPlanModule {}
