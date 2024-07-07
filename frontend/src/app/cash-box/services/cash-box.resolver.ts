import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router'
import { CashBox } from '../../model/cash-box.model'
import { Observable, of } from 'rxjs'
import { inject, Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import * as fromApp from '../../store/app.reducer'
import { map, switchMap, take } from 'rxjs/operators'
import * as CashBoxAction from '../store/cash-boxes/cash-box.actions'
import * as CashBoxActions from '../store/cash-boxes/cash-box.actions'
import { Actions, ofType } from '@ngrx/effects'
import { loadActiveBudgetPlan } from '../../budget-plan/store/budget-plan.actions'

export const resolveCashBox: ResolveFn<CashBox> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(CashBoxResolver).resolve(route, state)
}

@Injectable({
  providedIn: 'root',
})
export class CashBoxResolver {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions,
  ) {}

  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot): Observable<CashBox> | Promise<CashBox> | CashBox {
    const id = route.paramMap.get('id')
    this.store.dispatch(CashBoxActions.setSelectedCashBox({ cashBoxId: +id }))
    this.store.dispatch(loadActiveBudgetPlan({ cashBoxId: +id }))

    return this.store.select('cashBoxes').pipe(
      take(1),
      map((storeState) => {
        return storeState.cashBoxes
      }),
      switchMap((cashBoxes) => {
        const cashBox = cashBoxes.find((c) => c.id === +id)
        if (cashBox) {
          return of(cashBox)
        } else {
          this.store.dispatch(CashBoxAction.loadCashBoxes())
          return this.actions$.pipe(
            ofType(CashBoxAction.loadCashBoxesSuccess),
            take(1),
            map((result) => {
              return result.cashBoxes.find((c) => c.id === +id)
            }),
          )
        }
      }),
    )
  }
}
