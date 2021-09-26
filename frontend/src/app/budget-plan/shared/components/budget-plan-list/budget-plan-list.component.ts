import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as fromApp from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { BudgetPlan } from '../../../../model/budget-plan.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from '../../../../shared/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as BudgetPlanAction from '../../../store/budget-plan.actions';

@Component({
  selector: 'app-cash-box-budget-plan-list',
  templateUrl: './budget-plan-list.component.html',
  styleUrls: ['./budget-plan-list.component.scss'],
})
export class BudgetPlanListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<BudgetPlan>();
  displayedColumns = ['name', 'date', 'budget', 'actions'];
  isLoading: boolean;
  private sub: Subscription;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() cashBoxId: number;

  selectedBudgetPlan: BudgetPlan;
  showReport = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private cRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sub = this.store.select('budgetPlan').subscribe((state) => {
      this.dataSource.data = state.budgetPlans;
      this.isLoading = state.loading;
      this.cRef.detectChanges();
    });
    this.dataSource.sort = this.sort;
  }

  onView(element: BudgetPlan): void {
    this.showReport = false;
    this.selectedBudgetPlan = element;
  }

  onEdit(element: BudgetPlan): void {
    this.router.navigate(['..', 'budget-plans', element.id, 'edit'], {
      relativeTo: this.activatedRoute,
    });
  }

  onCloseToggle(element: BudgetPlan): void {
    this.store.dispatch(
      BudgetPlanAction.closeBudgetPlan({
        cashBoxId: this.cashBoxId,
        index: element.id,
        close: !element.closed,
      })
    );
  }

  onDelete(element: BudgetPlan): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { data: element, headline: element.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === element) {
        this.store.dispatch(
          BudgetPlanAction.deleteBudgetPlan({
            cashBoxId: this.cashBoxId,
            index: element.id,
          })
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
