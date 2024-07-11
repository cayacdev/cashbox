import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { inject, Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import * as fromApp from '../../store/app.reducer'
import { map, take, tap } from 'rxjs/operators'
import * as BudgetPlanAction from '../store/budget-plan.actions'

export const resolveBudgetPlans: ResolveFn<boolean> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(BudgetPlansResolver).resolve(route, state)
}

@Injectable({
  providedIn: 'root',
})
export class BudgetPlansResolver {
  constructor(private store: Store<fromApp.AppState>) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = route.paramMap.get('id') as string

    return this.store.select('budgetPlan').pipe(
      take(1),
      tap(() => {
        this.store.dispatch(BudgetPlanAction.loadBudgetPlans({ cashBoxId: +id }))
      }),
      map(() => {
        return true
      }),
    )
  }
}
