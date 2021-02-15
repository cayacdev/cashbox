import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CashBoxAction from './cash-box.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CashBoxConnector } from '../../connectors/cash-box.connector';

@Injectable()
export class CashBoxEffects {
  fetchCashBoxes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashBoxAction.loadCashBoxes, CashBoxAction.updateCashBoxSuccess),
      switchMap(() => {
        return this.cashBoxConnector.fetchCashBoxes().pipe(
          map((cashBoxes) => CashBoxAction.loadCashBoxesSuccess({ cashBoxes })),
          catchError((error: HttpErrorResponse) => of(CashBoxAction.loadCashBoxesFail({ error: error.message })))
        );
      })
    )
  );

  createCashBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashBoxAction.addCashBox),
      switchMap(({ cashBox }) => {
        return this.cashBoxConnector.createCashBox(cashBox).pipe(
          map(() => CashBoxAction.updateCashBoxSuccess()),
          catchError((error: HttpErrorResponse) => of(CashBoxAction.updateCashBoxFail({ error: error.message })))
        );
      })
    )
  );

  updateCashBox$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashBoxAction.updateCashBox),
      switchMap(({ cashBox }) => {
        return this.cashBoxConnector.updateCashBox(cashBox).pipe(
          map(() => CashBoxAction.updateCashBoxSuccess()),
          catchError((error: HttpErrorResponse) => of(CashBoxAction.updateCashBoxFail({ error: error.message })))
        );
      })
    );
  });

  updateCashBoxSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CashBoxAction.updateCashBoxSuccess),
        tap(() => this.router.navigate(['/cash-boxes']))
      );
    },
    { dispatch: false }
  );

  deleteCashBox$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashBoxAction.deleteCashBox),
      switchMap(({ cashBox }) => {
        return this.cashBoxConnector.deleteCashBox(cashBox).pipe(
          map(() => {
            return CashBoxAction.updateCashBoxSuccess();
          }),
          catchError((error: HttpErrorResponse) => of(CashBoxAction.updateCashBoxFail({ error: error.message })))
        );
      })
    );
  });

  constructor(
    private actions$: Actions, //
    private http: HttpClient,
    private router: Router,
    private cashBoxConnector: CashBoxConnector
  ) {}
}
