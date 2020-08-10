import { NgModule } from '@angular/core';
import { BudgetPlanViewComponent } from './budget-plan-view/budget-plan-view.component';
import { BudgetPlanListComponent } from './budget-plan-list/budget-plan-list.component';
import { BudgetPlanEditComponent } from './budget-plan-edit/budget-plan-edit.component';
import { RouterModule } from '@angular/router';
import { BudgetPlanRoutingModule } from './budget-plan-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BudgetPlanViewComponent,
    BudgetPlanListComponent,
    BudgetPlanEditComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    BudgetPlanRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [BudgetPlanViewComponent, BudgetPlanListComponent],
})
export class BudgetPlanModule {}
