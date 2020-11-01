import { RouterModule, Routes } from '@angular/router';
import { CashBoxComponent } from '../cash-box/cash-box.component';
import { AuthGuard } from '../auth/auth.guard';
import { NgModule } from '@angular/core';
import { BudgetPlanViewComponent } from './budget-plan-view/budget-plan-view.component';
import { BudgetPlanEditComponent } from './budget-plan-edit/budget-plan-edit.component';
import { CashBoxIdResolver } from './cash-box-id.resolver';
import { BudgetPlanResolver } from './budget-plan.resolver';

const routes: Routes = [
  {
    path: 'cash-boxes/:id/budget-plans',
    component: CashBoxComponent,
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
