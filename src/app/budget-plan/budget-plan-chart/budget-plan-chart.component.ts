import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BaseChartDirective, Color } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay, take } from 'rxjs/operators';
import { BudgetPlan } from '../budget-plan.model';
import { BudgetPlanEntry } from '../budget-plan-entry.model';

@Component({
  selector: 'app-budget-plan-chart',
  templateUrl: './budget-plan-chart.component.html',
  styleUrls: ['./budget-plan-chart.component.scss'],
})
export class BudgetPlanChartComponent implements OnInit, OnChanges {
  constructor(private breakpointObserver: BreakpointObserver) {}

  @Input() budgetPlan: BudgetPlan;
  @Input() entries: BudgetPlanEntry[];

  public lineChartData: ChartDataSets[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 2,
    tooltips: { enabled: false },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
          },
        },
      ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    {
      backgroundColor: 'transparent',
      borderDash: [15, 10],
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
    {
      backgroundColor: 'transparent',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  ngOnInit(): void {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map((result) => result.matches),
        shareReplay(),
        take(1)
      )
      .subscribe((isHandset) => {
        this.lineChartOptions.aspectRatio = isHandset ? 2 : 4;
      });

    this.lineChartData.push({
      data: [
        { x: this.budgetPlan.start_date, y: this.budgetPlan.budget },
        { x: this.budgetPlan.end_date, y: 0 },
      ],
      label: 'Planned',
    });
    this.lineChartData.push({
      data: [],
      label: 'Real',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeChartData();
  }

  private changeChartData(): void {
    const grouped = this.groupByDate(
      this.entries.slice().sort(this.compareDate())
    );

    const data = [{ x: this.budgetPlan.start_date, y: this.budgetPlan.budget }];
    this.generateDataFromEntries(grouped, this.budgetPlan.budget, data);

    if (this.lineChartData[1]) {
      this.lineChartData[1].data = data;
    }
  }

  private groupByDate(
    entries: BudgetPlanEntry[]
  ): { [p: string]: BudgetPlanEntry[] } {
    return entries.reduce((previousValue, entry) => {
      (previousValue[entry.date.toString()] =
        previousValue[entry.date.toString()] || []).push(entry);
      return previousValue;
    }, {});
  }

  private compareDate(): (a: BudgetPlanEntry, b: BudgetPlanEntry) => number {
    return (a: BudgetPlanEntry, b: BudgetPlanEntry) => {
      const d1 = new Date(a.date);
      const d2 = new Date(b.date);

      const same = d1.getTime() === d2.getTime();
      if (same) {
        return 0;
      }

      if (d1 > d2) {
        return 1;
      }

      if (d1 < d2) {
        return -1;
      }
    };
  }

  private generateDataFromEntries(
    grouped: { [p: string]: BudgetPlanEntry[] },
    leftover: number,
    data: { x: Date; y: number }[]
  ): void {
    Object.keys(grouped).forEach((key, index) => {
      const value = grouped[key].reduce((previousValue, entry) => {
        return previousValue + entry.value;
      }, 0);

      leftover = leftover - value;

      data.push({
        x: new Date(key),
        y: leftover,
      });
    });
    data.push({ x: new Date(), y: leftover });
  }
}
