import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { BudgetPlan } from './budget-plan.model';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map, switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as BudgetPlanAction from './store/budget-plan.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class BudgetPlanResolver implements Resolve<BudgetPlan> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<BudgetPlan> | Promise<BudgetPlan> | BudgetPlan {
    const id = route.paramMap.get('id');
    return this.store.select('budgetPlan').pipe(
      take(1),
      switchMap((storeState) => {
        const budgetPlan = storeState.budgetPlans.find(
          (plan) => plan.id === +id
        );

        if (budgetPlan) {
          return of(budgetPlan);
        } else {
          this.store.dispatch(
            BudgetPlanAction.fetchBudgetPlans({ cashBoxId: 1 })
          );
          return this.actions$.pipe(
            ofType(BudgetPlanAction.setBudgetPlans),
            take(1),
            map((result) => {
              return result.budgetPlans.find((c) => c.id === +id);
            })
          );
        }
      })
    );
  }
}
