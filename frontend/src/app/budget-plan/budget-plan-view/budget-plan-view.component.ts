import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BudgetPlan } from '../../model/budget-plan.model';
import { BudgetPlanEntry } from '../budget-plan-entry.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { MatDialog } from '@angular/material/dialog';
import {
  BudgetPlanEntryDialogComponent,
  BudgetPlanEntryDialogData,
} from '../budget-plan-entry-dialog/budget-plan-entry-dialog.component';
import * as BudgetPlanAction from '../store/budget-plan.actions';
import {
  DeleteDialogComponent,
  DeleteDialogData,
} from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-cash-box-budget-plan-view',
  templateUrl: './budget-plan-view.component.html',
  styleUrls: ['./budget-plan-view.component.scss'],
})
export class BudgetPlanViewComponent implements OnInit {
  @Input() budgetPlan: BudgetPlan;
  @Input() cashBoxId: number;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  entries = new MatTableDataSource<BudgetPlanEntry>();
  displayedColumns = ['date', 'user', 'description', 'value', 'actions'];

  showDescription = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.entries.sortingDataAccessor = (item, property): string | number => {
      switch (property) {
        case 'date':
          return new Date(item.date).getTime();
        case 'user':
          return item.user.name;
        default:
          return item[property];
      }
    };

    if (!!this.budgetPlan.entries) {
      this.entries.data = this.budgetPlan.entries;
    }
    const id = this.budgetPlan.id;
    this.store.select('budgetPlan').subscribe((state) => {
      this.entries.data =
        state.budgetPlans.find((plan) => plan.id === id)?.entries ?? [];
    });
    this.store.dispatch(
      BudgetPlanAction.fetchEntries({
        cashBoxId: this.cashBoxId,
        budgetPlanId: id,
      })
    );

    this.entries.sort = this.sort;
  }

  getTotalCost(): number {
    return this.entries.data
      ?.map((t) => t.value)
      .reduce((acc, value) => acc + value, 0);
  }

  onEdit(element: any): void {
    this.dialog.open(BudgetPlanEntryDialogComponent, {
      data: {
        data: element,
        budgetPlanId: this.budgetPlan.id,
        cashBoxId: this.cashBoxId,
      } as BudgetPlanEntryDialogData,
    });
  }

  onDelete(element: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        data: element,
        headline: element.id,
      } as DeleteDialogData,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === element) {
        this.store.dispatch(
          BudgetPlanAction.deleteEntry({
            cashBoxId: this.cashBoxId,
            budgetPlanId: this.budgetPlan.id,
            index: element.id,
          })
        );
      }
    });
  }

  getDisplayedColumns() {
    if (!this.showDescription) {
      return this.displayedColumns.filter((col) => col !== 'description');
    }
    return this.displayedColumns;
  }
}
