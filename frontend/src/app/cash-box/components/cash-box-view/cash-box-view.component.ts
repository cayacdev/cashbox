import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CashBox } from '../../../model/cash-box.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { Observable, Subscription } from 'rxjs';
import { BudgetPlan } from '../../../model/budget-plan.model';
import { selectActiveBudgetPlan } from '../../../budget-plan/store/budget-plan.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cash-box-view',
  templateUrl: './cash-box-view.component.html',
  styleUrls: ['./cash-box-view.component.scss'],
})
export class CashBoxViewComponent implements OnInit, OnDestroy {
  cashBox$: Observable<CashBox>;
  budgetPlan: BudgetPlan;
  private sub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.cashBox$ = this.store.select('cashBoxes').pipe(map((state) => state.cashBoxes.find((box) => box.id === state.selectedCashBoxId)));
    this.sub = this.store.select(selectActiveBudgetPlan).subscribe((budgetPlan) => {
      this.budgetPlan = budgetPlan;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
