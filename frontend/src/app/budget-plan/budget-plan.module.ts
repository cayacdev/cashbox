import { NgModule } from '@angular/core'
import { BudgetPlanViewComponent } from './shared/components/budget-plan-view/budget-plan-view.component'
import { BudgetPlanListComponent } from './shared/components/budget-plan-list/budget-plan-list.component'
import { BudgetPlanEditComponent } from './components/budget-plan-edit/budget-plan-edit.component'
import { RouterModule } from '@angular/router'
import { BudgetPlanRoutingModule } from './budget-plan-routing.module'
import { SharedModule } from '../shared/shared.module'
import { BudgetPlanEntryDialogComponent } from './components/budget-plan-entry-dialog/budget-plan-entry-dialog.component'
import { BudgetPlanChartComponent } from './components/budget-plan-chart/budget-plan-chart.component'
import { BudgetPlanReportComponent } from './shared/components/budget-plan-report/budget-plan-report.component'
import { NgChartsModule } from 'ng2-charts'

@NgModule({
  declarations: [
    BudgetPlanViewComponent,
    BudgetPlanListComponent,
    BudgetPlanEditComponent,
    BudgetPlanEntryDialogComponent,
    BudgetPlanChartComponent,
    BudgetPlanReportComponent,
  ],
  imports: [SharedModule, RouterModule, BudgetPlanRoutingModule, NgChartsModule],
  exports: [BudgetPlanViewComponent, BudgetPlanListComponent, BudgetPlanReportComponent],
})
export class BudgetPlanModule {}
