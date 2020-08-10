import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { BudgetPlan } from '../budget-plan.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cash-box-budget-plan-list',
  templateUrl: './budget-plan-list.component.html',
  styleUrls: ['./budget-plan-list.component.scss'],
})
export class BudgetPlanListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<BudgetPlan>();
  displayedColumns = [
    'name',
    'start_date',
    'end_date',
    'budget',
    'active',
    'actions',
  ];
  isLoading: boolean;
  private sub: Subscription;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.store.select('budgetPlan').subscribe((state) => {
      this.dataSource.data = state.budgetPlans;
      this.isLoading = state.loading;
    });
    this.dataSource.sort = this.sort;
  }

  onView(element: any): void {}

  onEdit(element: BudgetPlan): void {
    this.router.navigate(['budget-plans', element.id, 'edit'], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(element: any): void {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
