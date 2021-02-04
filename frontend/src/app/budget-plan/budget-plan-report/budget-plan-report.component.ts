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
import { BudgetPlan, BudgetPlanReport } from '../budget-plan.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartOptions } from 'chart.js';
import { BudgetPlanEntry } from '../budget-plan-entry.model';

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

  @ViewChild('paidByDescriptionSort', { static: false })
  paidByDescriptionSort: MatSort;
  paidByDescriptionEntries = new MatTableDataSource<any>();
  paidByDescriptionDisplayedColumns = ['description', 'value'];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
  };
  pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: true,
  };

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('budgetPlan').subscribe((state) => {
      const plan = state.budgetPlans.find((p) => p.id === this.budgetPlanId);
      this.name = plan?.name;
      this.report = plan?.report;
      this.paidByUserEntries.data = this.report?.paidByUser ?? [];
      this.debtsEntries.data = this.report?.debtsByUser ?? [];
      if (plan) {
        this.paidByDescriptionEntries.data = this.calculatePaidByDescription(
          plan
        );
      }
    });
    this.store.dispatch(
      BudgetPlanAction.fetchReport({
        cashBoxId: this.cashBoxId,
        budgetPlanId: this.budgetPlanId,
      })
    );
  }

  private calculatePaidByDescription(
    plan: BudgetPlan
  ): { description: string; value: number }[] {
    return this.groupByDescription(plan.entries);
  }

  private groupByDescription(entries: BudgetPlanEntry[]): DataSet[] {
    let groups = entries.reduce((previousValue, entry) => {
      const index = previousValue.findIndex(
        (row) => row.description === entry.description
      );
      if (index === -1) {
        previousValue.push({
          description: entry.description,
          value: entry.value,
        });
      } else {
        previousValue[index].value += entry.value;
      }

      return previousValue;
    }, []);

    groups = groups.sort((a: DataSet, b: DataSet) => {
      return b.value - a.value;
    });

    return groups.reduce((previousValue: DataSet[], dataSet: DataSet) => {
      if (previousValue.length < 5) {
        previousValue.push(dataSet);
      } else {
        const index = previousValue.findIndex(
          (row) => row.description === 'Misc'
        );
        if (index === -1) {
          previousValue.push({ description: 'Misc', value: dataSet.value });
        } else {
          previousValue[index].value += dataSet.value;
        }
      }
      return previousValue;
    }, []);
  }

  getLabels() {
    return this.paidByDescriptionEntries.data.map((entry) => entry.description);
  }

  getData() {
    return this.paidByDescriptionEntries.data.map((entry) => entry.value);
  }

  ngAfterViewChecked(): void {
    this.paidByUserEntries.sort = this.paidByUserSort;
    this.debtsEntries.sort = this.debtsSort;
    this.paidByDescriptionEntries.sort = this.paidByDescriptionSort;
  }
}

class DataSet {
  description: string;
  value: number;
}
