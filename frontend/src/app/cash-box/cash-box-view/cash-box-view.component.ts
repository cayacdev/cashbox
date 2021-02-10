import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CashBox } from '../../model/cash-box.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Subscription } from 'rxjs';
import { BudgetPlan } from '../../model/budget-plan.model';
import * as CashBoxSelectors from '../store/cash-box.selector';

@Component({
  selector: 'app-cash-box-view',
  templateUrl: './cash-box-view.component.html',
  styleUrls: ['./cash-box-view.component.scss'],
})
export class CashBoxViewComponent implements OnInit, OnDestroy {
  cashBox: CashBox;
  budgetPlan: BudgetPlan;
  isLoading: boolean;
  private sub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.sub = this.store
      .select(CashBoxSelectors.getActiveCashBox)
      .subscribe((cashBox) => {
        this.isLoading = !!!cashBox;
        this.cashBox = cashBox;
        if (cashBox?.activeBudgetPlan) {
          this.budgetPlan = { ...cashBox.activeBudgetPlan, entries: undefined };
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
