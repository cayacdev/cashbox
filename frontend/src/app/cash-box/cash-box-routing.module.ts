import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CashBoxComponent } from './cash-box.component';
import { CashBoxListComponent } from './cash-box-list/cash-box-list.component';
import { CashBoxEditComponent } from './cash-box-edit/cash-box-edit.component';
import { CashBoxResolver } from './cash-box.resolver';
import { BudgetPlansResolver } from '../budget-plan/budget-plans-resolver.service';
import { CashBoxOverviewComponent } from './cash-box-overview/cash-box-overview.component';
import { CashBoxViewComponent } from './cash-box-view/cash-box-view.component';
import { CashBoxPlansComponent } from './cash-box-plans/cash-box-plans.component';
import { CashBoxReportComponent } from './cash-box-report/cash-box-report.component';
import { CashBoxSettingsComponent } from './cash-box-settings/cash-box-settings.component';

const routes: Routes = [
  {
    path: 'cash-boxes',
    component: CashBoxComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CashBoxListComponent },
      { path: 'new', component: CashBoxEditComponent },
      {
        path: ':id',
        component: CashBoxOverviewComponent,
        resolve: { cashBox: CashBoxResolver, budgetPlans: BudgetPlansResolver },
        children: [
          {
            path: 'view',
            component: CashBoxViewComponent,
          },
          {
            path: 'report',
            component: CashBoxReportComponent,
          },
          {
            path: 'plans',
            component: CashBoxPlansComponent,
          },
          {
            path: 'settings',
            component: CashBoxSettingsComponent,
          },
        ],
      },
      {
        path: ':id/edit',
        component: CashBoxEditComponent,
        resolve: { cashBox: CashBoxResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashBoxRoutingModule {}
