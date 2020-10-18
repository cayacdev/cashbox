import { NgModule } from '@angular/core';
import { BudgetPlanViewComponent } from './budget-plan-view/budget-plan-view.component';
import { BudgetPlanListComponent } from './budget-plan-list/budget-plan-list.component';
import { BudgetPlanEditComponent } from './budget-plan-edit/budget-plan-edit.component';
import { RouterModule } from '@angular/router';
import { BudgetPlanRoutingModule } from './budget-plan-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BudgetPlanEntryDialogComponent } from './budget-plan-entry-dialog/budget-plan-entry-dialog.component';

@NgModule({
  declarations: [
    BudgetPlanViewComponent,
    BudgetPlanListComponent,
    BudgetPlanEditComponent,
    BudgetPlanEntryDialogComponent,
  ],
  imports: [SharedModule, RouterModule, BudgetPlanRoutingModule],
  exports: [BudgetPlanViewComponent, BudgetPlanListComponent],
})
export class BudgetPlanModule {}
