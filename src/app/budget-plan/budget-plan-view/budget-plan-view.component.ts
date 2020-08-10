import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BudgetPlan } from '../budget-plan.model';

interface CashBoxEntries {
  date: Date;
  userName: string;
  description: string;
  amount: number;
}

const TEST_DATA: CashBoxEntries[] = [
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
  {
    date: new Date(),
    userName: 'Test User',
    description: 'Lebensmittel',
    amount: 12.32,
  },
];

@Component({
  selector: 'app-cash-box-budget-plan-view',
  templateUrl: './budget-plan-view.component.html',
  styleUrls: ['./budget-plan-view.component.scss'],
})
export class BudgetPlanViewComponent implements OnInit {
  @Input() budgetPlan: BudgetPlan;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  entries = new MatTableDataSource<CashBoxEntries>();
  displayedColumns = ['date', 'userName', 'description', 'amount'];

  constructor() {}

  ngOnInit(): void {
    this.entries.data = TEST_DATA;
    this.entries.sort = this.sort;
  }

  getTotalCost(): number {
    return this.entries.data
      .map((t) => t.amount)
      .reduce((acc, value) => acc + value, 0);
  }
}
