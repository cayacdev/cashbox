import { AfterViewChecked, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import * as BudgetPlanAction from '../../../store/budget-plan.actions'
import { Store } from '@ngrx/store'
import * as fromApp from '../../../../store/app.reducer'
import { BudgetPlanReport } from '../../../../model/budget-plan.model'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { BudgetPlanEntry } from '../../../../model/budget-plan-entry.model'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-budget-plan-report',
  templateUrl: './budget-plan-report.component.html',
  styleUrls: ['./budget-plan-report.component.scss'],
})
export class BudgetPlanReportComponent implements OnInit, AfterViewChecked, OnDestroy {
  @Input() cashBoxId: number
  @Input() budgetPlanId: number
  name?: string
  report: BudgetPlanReport

  @ViewChild('paidByUserSort', { static: false }) paidByUserSort: MatSort
  paidByUserEntries = new MatTableDataSource<{ name: string; value: number }>()
  paidByUserDisplayedColumns = ['name', 'value']

  @ViewChild('debtsSort', { static: false }) debtsSort: MatSort
  debtsEntries = new MatTableDataSource<unknown>()
  debtsDisplayedColumns = ['debtor', 'creditor', 'value']

  @ViewChild('paidByDescriptionSort', { static: false }) paidByDescriptionSort: MatSort
  paidByDescriptionEntries = new MatTableDataSource<{ description: string; value: number }>()
  paidByDescriptionDisplayedColumns = ['description', 'value']

  private subscription: Subscription

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('budgetPlan').subscribe((state) => {
      const plan = state.budgetPlans.find((p) => p.id === this.budgetPlanId)
      this.name = plan?.name

      this.report = state.budgetPlansReports[this.budgetPlanId]

      this.paidByUserEntries.data = this.report?.paidByUser ?? []
      this.debtsEntries.data = this.report?.debtsByUser ?? []

      const entries = state.budgetPlansEntries[this.budgetPlanId] ?? []
      this.paidByDescriptionEntries.data = this.calculatePaidByDescription(entries)
    })
    this.store.dispatch(
      BudgetPlanAction.loadBudgetPlanReport({
        cashBoxId: this.cashBoxId,
        budgetPlanId: this.budgetPlanId,
      }),
    )
  }

  private calculatePaidByDescription(entries: BudgetPlanEntry[]): {
    description: string
    value: number
  }[] {
    return this.groupByDescription(entries)
  }

  private groupByDescription(entries: BudgetPlanEntry[]): DataSet[] {
    let groups = entries.reduce((previousValue, entry) => {
      const index = previousValue.findIndex((row) => row.description === entry.description)
      if (index === -1) {
        previousValue.push({
          description: entry.description,
          value: entry.value,
        })
      } else {
        previousValue[index].value += entry.value
      }

      return previousValue
    }, [] as DataSet[])

    groups = groups.sort((a: DataSet, b: DataSet) => {
      return b.value - a.value
    })

    return groups.reduce((previousValue: DataSet[], dataSet: DataSet) => {
      if (previousValue.length < 5) {
        previousValue.push(dataSet)
      } else {
        const index = previousValue.findIndex((row) => row.description === 'Misc')
        if (index === -1) {
          previousValue.push({ description: 'Misc', value: dataSet.value })
        } else {
          previousValue[index].value += dataSet.value
        }
      }
      return previousValue
    }, [])
  }

  ngAfterViewChecked(): void {
    this.paidByUserEntries.sort = this.paidByUserSort
    this.debtsEntries.sort = this.debtsSort
    this.paidByDescriptionEntries.sort = this.paidByDescriptionSort
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}

class DataSet {
  description: string
  value: number
}
