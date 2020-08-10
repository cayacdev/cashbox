import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { CashBox } from './cash-box.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map, switchMap, take } from 'rxjs/operators';
import * as CashBoxAction from './store/cash-box.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
export class CashBoxResolver implements Resolve<CashBox> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CashBox> | Promise<CashBox> | CashBox {
    const id = route.paramMap.get('id');

    return this.store.select('cashBoxes').pipe(
      take(1),
      map((storeState) => {
        return storeState.cashBoxes;
      }),
      switchMap((cashBoxes) => {
        const cashBox = cashBoxes.find((c) => c.id === +id);
        if (cashBox) {
          return of(cashBox);
        } else {
          this.store.dispatch(CashBoxAction.fetchCashBoxes());
          return this.actions$.pipe(
            ofType(CashBoxAction.setCashBoxes),
            take(1),
            map((result) => {
              return result.cashBoxes.find((c) => c.id === +id);
            })
          );
        }
      })
    );
  }
}
