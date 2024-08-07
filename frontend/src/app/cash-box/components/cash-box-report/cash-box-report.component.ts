import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import * as fromApp from '../../../store/app.reducer'
import { selectActiveBudgetPlan } from '../../../budget-plan/store/budget-plan.selectors'

@Component({
  selector: 'app-cash-box-report',
  template: '<app-budget-plan-report [cashBoxId]="(cashBoxId$ | async)" [budgetPlanId]="(budgetPlanId$ | async)"></app-budget-plan-report>',
})
export class CashBoxReportComponent implements OnInit {
  cashBoxId$: Observable<number>
  budgetPlanId$: Observable<number>

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    this.cashBoxId$ = this.activatedRoute.parent?.data.pipe(map((data) => data.cashBox.id)) as Observable<number>
    this.budgetPlanId$ = this.store.select(selectActiveBudgetPlan).pipe(map((plan) => plan?.id)) as Observable<number>
  }
}
