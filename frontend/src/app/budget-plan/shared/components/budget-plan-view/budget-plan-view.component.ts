import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatSort } from '@angular/material/sort';
import { BudgetPlan } from '../../../../model/budget-plan.model';
import { BudgetPlanEntry } from '../../../../model/budget-plan-entry.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import {
  BudgetPlanEntryDialogComponent,
  BudgetPlanEntryDialogData,
} from '../../../components/budget-plan-entry-dialog/budget-plan-entry-dialog.component';
import * as BudgetPlanAction from '../../../store/budget-plan.actions';
import { DeleteDialogComponent, DeleteDialogData } from '../../../../shared/delete-dialog/delete-dialog.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingState } from '../../../../store/state';

@Component({
  selector: 'app-cash-box-budget-plan-view',
  templateUrl: './budget-plan-view.component.html',
  styleUrls: ['./budget-plan-view.component.scss'],
})
export class BudgetPlanViewComponent implements OnInit {
  @Input() budgetPlan: BudgetPlan;
  @Input() cashBoxId: number;

  @ViewChild(MatSort, { static: false }) set sort(sort: MatSort) {
    this.entries.sort = sort;
  }

  entries = new MatTableDataSource<BudgetPlanEntry>();
  displayedColumns = ['date', 'user', 'description', 'value', 'actions'];

  showDescription = false;
  entriesLoaded$: Observable<boolean>;

  activeUserEmail$ = this.store.select('auth').pipe(map((state) => state.user.email));

  constructor(private store: Store<fromApp.AppState>, private dialog: MatDialog) {}

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
    this.entriesLoaded$ = this.store.select('budgetPlan').pipe(map((state) => state.loadBudgetPlanEntriesState === LoadingState.LOADED));

    const id = this.budgetPlan.id;
    this.store.select('budgetPlan').subscribe((state) => {
      this.entries.data = state.budgetPlansEntries[id] ?? [];
    });
    this.store.dispatch(
      BudgetPlanAction.loadBudgetPlanEntries({
        cashBoxId: this.cashBoxId,
        budgetPlanId: id,
      })
    );
  }

  getTotalCost(): number {
    return this.entries.data?.map((t) => t.value).reduce((acc, value) => acc + value, 0);
  }

  onEdit(element: BudgetPlanEntry): void {
    this.dialog.open(BudgetPlanEntryDialogComponent, {
      data: {
        data: element,
        budgetPlanId: this.budgetPlan.id,
        cashBoxId: this.cashBoxId,
      } as BudgetPlanEntryDialogData,
    });
  }

  onDelete(element: BudgetPlanEntry): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        data: element,
        headline: `${element.id}`,
      } as DeleteDialogData,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === element) {
        this.store.dispatch(
          BudgetPlanAction.deleteBudgetPlanEntry({
            cashBoxId: this.cashBoxId,
            budgetPlanId: this.budgetPlan.id,
            budgetPlanEntryId: element.id,
          })
        );
      }
    });
  }

  getDisplayedColumns(): string[] {
    if (!this.showDescription) {
      return this.displayedColumns.filter((col) => col !== 'description');
    }
    return this.displayedColumns;
  }

  isAllowed(element: BudgetPlanEntry): Observable<boolean> {
    return this.activeUserEmail$.pipe(map((activeUserEmail) => activeUserEmail === element.user.email && !this.budgetPlan.closed));
  }
}
