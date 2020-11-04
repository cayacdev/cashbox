import {
  AfterViewChecked,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as BudgetPlanAction from '../store/budget-plan.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { BudgetPlanReport } from '../budget-plan.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-budget-plan-report',
  templateUrl: './budget-plan-report.component.html',
  styleUrls: ['./budget-plan-report.component.scss'],
})
export class BudgetPlanReportComponent implements OnInit, AfterViewChecked {
  @Input() cashBoxId: number;
  @Input() budgetPlanId: number;
  name: string;
  report: BudgetPlanReport;

  @ViewChild('paidByUserSort', { static: false }) paidByUserSort: MatSort;
  paidByUserEntries = new MatTableDataSource<any>();
  paidByUserDisplayedColumns = ['name', 'value'];

  @ViewChild('debtsSort', { static: false }) debtsSort: MatSort;
  debtsEntries = new MatTableDataSource<any>();
  debtsDisplayedColumns = ['debtor', 'creditor', 'value'];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
  };

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('budgetPlan').subscribe((state) => {
      const plan = state.budgetPlans.find((p) => p.id === this.budgetPlanId);
      this.name = plan?.name;
      this.report = plan?.report;
      this.paidByUserEntries.data = this.report?.paidByUser ?? [];
      this.debtsEntries.data = this.report?.debtsByUser ?? [];
    });
    this.store.dispatch(
      BudgetPlanAction.fetchReport({
        cashBoxId: this.cashBoxId,
        budgetPlanId: this.budgetPlanId,
      })
    );
  }

  ngAfterViewChecked(): void {
    this.paidByUserEntries.sort = this.paidByUserSort;
    this.debtsEntries.sort = this.debtsSort;
  }
}
