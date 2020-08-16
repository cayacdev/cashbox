import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BudgetPlan } from '../budget-plan.model';
import { BudgetPlanEntry } from '../budget-plan-entry.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-cash-box-budget-plan-view',
  templateUrl: './budget-plan-view.component.html',
  styleUrls: ['./budget-plan-view.component.scss'],
})
export class BudgetPlanViewComponent implements OnInit {
  @Input() budgetPlan: BudgetPlan;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  entries = new MatTableDataSource<BudgetPlanEntry>();
  displayedColumns = ['date', 'user', 'description', 'value'];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    if (this.budgetPlan.entries) {
      this.entries.data = this.budgetPlan.entries;
    } else {
      const id = this.budgetPlan.id;
      this.store.select('budgetPlan').subscribe((state) => {
        this.entries.data = state.budgetPlans.find(
          (plan) => plan.id === id
        ).entries;
      });
    }

    this.entries.sort = this.sort;
  }

  getTotalCost(): number {
    return this.entries.data
      ?.map((t) => t.value)
      .reduce((acc, value) => acc + value, 0);
  }
}
