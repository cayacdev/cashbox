import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { BaseChartDirective } from 'ng2-charts'
import { ChartConfiguration, ChartData } from 'chart.js'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { map, shareReplay, take } from 'rxjs/operators'
import { BudgetPlan } from '../../../model/budget-plan.model'
import { BudgetPlanEntry } from '../../../model/budget-plan-entry.model'
import 'chartjs-adapter-moment'

@Component({
  selector: 'app-budget-plan-chart',
  templateUrl: './budget-plan-chart.component.html',
  styleUrls: ['./budget-plan-chart.component.scss'],
})
export class BudgetPlanChartComponent implements OnInit, OnChanges {
  constructor(private breakpointObserver: BreakpointObserver) {}

  @Input() budgetPlan: BudgetPlan
  @Input() entries: BudgetPlanEntry[]

  public lineChartData: ChartData<'line', { x: Date; y: number }[]> = {
    datasets: [
      {
        label: 'Planned',
        data: [],
        backgroundColor: 'transparent',
        borderDash: [15, 10],
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      },
      {
        label: 'Real',
        data: [],
        backgroundColor: 'transparent',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      },
    ],
  }

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    aspectRatio: 2,
    scales: {
      xAxes: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
    },
  }

  public lineChartLegend = false

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective

  ngOnInit(): void {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map((result) => result.matches),
        shareReplay(),
        take(1),
      )
      .subscribe((isHandset) => {
        this.lineChartOptions!.aspectRatio = isHandset ? 2 : 4
      })

    this.lineChartData.datasets.find((d) => d.label === 'Planned')!.data = [
      { x: new Date(this.budgetPlan.start_date), y: this.budgetPlan.budget },
      { x: new Date(this.budgetPlan.end_date), y: 0 },
    ]

    this.updateChartData()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChartData()
  }

  private updateChartData(): void {
    const grouped = this.groupByDate(this.entries.slice().sort(this.compareDate()))

    const data = [{ x: new Date(this.budgetPlan.start_date), y: this.budgetPlan.budget }]
    this.generateDataFromEntries(this.budgetPlan, grouped, this.budgetPlan.budget, data)

    let dataset = this.lineChartData.datasets.find((d) => d.label === 'Real')
    if (dataset?.data.length === 0) {
      dataset.data.push(...data)
    }
  }

  private groupByDate(entries: BudgetPlanEntry[]): { [p: string]: BudgetPlanEntry[] } {
    return entries.reduce((previousValue, entry) => {
      ;(previousValue[entry.date.toString()] = previousValue[entry.date.toString()] || []).push(entry)
      return previousValue
    }, {})
  }

  private compareDate(): (a: BudgetPlanEntry, b: BudgetPlanEntry) => number {
    return (a: BudgetPlanEntry, b: BudgetPlanEntry) => {
      const d1 = new Date(a.date)
      const d2 = new Date(b.date)

      if (d1 > d2) {
        return 1
      }

      if (d1 < d2) {
        return -1
      }

      return 0
    }
  }

  private generateDataFromEntries(
    budgetPlan: BudgetPlan,
    grouped: { [p: string]: BudgetPlanEntry[] },
    leftover: number,
    data: { x: Date; y: number }[],
  ): void {
    Object.keys(grouped).forEach((key) => {
      const value = grouped[key].reduce((previousValue, entry) => {
        return previousValue + entry.value
      }, 0)

      leftover = leftover - value

      data.push({
        x: new Date(key),
        y: leftover,
      })
    })

    const today = new Date()
    if (today >= new Date(budgetPlan.start_date) && today <= new Date(budgetPlan.end_date)) {
      data.push({ x: today, y: leftover })
    }
  }
}
