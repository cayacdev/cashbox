import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CashBox } from '../../../model/cash-box.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { Observable } from 'rxjs';
import { BudgetPlan } from '../../../model/budget-plan.model';
import { selectActiveBudgetPlan } from '../../../budget-plan/store/budget-plan.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cash-box-view',
  templateUrl: './cash-box-view.component.html',
  styleUrls: ['./cash-box-view.component.scss'],
})
export class CashBoxViewComponent implements OnInit {
  cashBox$: Observable<CashBox>;
  budgetPlan$: Observable<BudgetPlan>;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.cashBox$ = this.store.select('cashBoxes').pipe(map((state) => state.cashBoxes.find((box) => box.id === state.selectedCashBoxId)));
    this.budgetPlan$ = this.store.select(selectActiveBudgetPlan);
  }
}
