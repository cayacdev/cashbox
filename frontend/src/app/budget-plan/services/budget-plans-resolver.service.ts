import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, take, tap } from 'rxjs/operators';
import * as BudgetPlanAction from '../store/budget-plan.actions';
import { Actions } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
export class BudgetPlansResolver implements Resolve<boolean> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const id = route.paramMap.get('id');

    return this.store.select('budgetPlan').pipe(
      take(1),
      tap(() => {
        this.store.dispatch(
          BudgetPlanAction.fetchBudgetPlans({ cashBoxId: +id })
        );
      }),
      map(() => {
        return true;
      })
    );
  }
}
