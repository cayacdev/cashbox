import { RouterModule, Routes } from '@angular/router'
import { CashBoxRouterOutletComponent } from '../cash-box/components/cash-box-router-outlet/cash-box-router-outlet.component'
import { authGuard } from '../auth/auth.guard'
import { NgModule } from '@angular/core'
import { BudgetPlanViewComponent } from './shared/components/budget-plan-view/budget-plan-view.component'
import { BudgetPlanEditComponent } from './components/budget-plan-edit/budget-plan-edit.component'
import { resolveCashBoxId } from './services/cash-box-id.resolver'
import { resolveBudgetPlan } from './services/budget-plan.resolver'

const routes: Routes = [
  {
    path: 'cash-boxes/:id/budget-plans',
    component: CashBoxRouterOutletComponent,
    canActivate: [authGuard],
    resolve: { cashBoxId: resolveCashBoxId },
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
        resolve: { budgetPlan: resolveBudgetPlan },
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetPlanRoutingModule {}
