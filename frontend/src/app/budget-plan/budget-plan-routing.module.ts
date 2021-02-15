import { RouterModule, Routes } from '@angular/router';
import { CashBoxRouterOutletComponent } from '../cash-box/components/cash-box-router-outlet/cash-box-router-outlet.component';
import { AuthGuard } from '../auth/auth.guard';
import { NgModule } from '@angular/core';
import { BudgetPlanViewComponent } from './shared/components/budget-plan-view/budget-plan-view.component';
import { BudgetPlanEditComponent } from './components/budget-plan-edit/budget-plan-edit.component';
import { CashBoxIdResolver } from './services/cash-box-id.resolver';
import { BudgetPlanResolver } from './services/budget-plan.resolver';

const routes: Routes = [
  {
    path: 'cash-boxes/:id/budget-plans',
    component: CashBoxRouterOutletComponent,
    canActivate: [AuthGuard],
    resolve: { cashBoxId: CashBoxIdResolver },
    children: [
      {
        path: 'new',
        component: BudgetPlanEditComponent,
      },
      {
        path: ':id',
        component: BudgetPlanViewComponent,
      },
      {
        path: ':id/edit',
        component: BudgetPlanEditComponent,
        resolve: { budgetPlan: BudgetPlanResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetPlanRoutingModule {}
