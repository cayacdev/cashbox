import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CashBoxAction from './cash-box.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { combineLatest, EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';
import { CashBox } from '../cash-box.model';
import { BudgetPlan } from '../../budget-plan/budget-plan.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class CashBoxEffects {
  private readonly ENDPOINT_CASH_BOX = `${environment.backendDomain}/v1/cash-boxes`;

  fetchCashBoxes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashBoxAction.fetchCashBoxes),
      switchMap(() => {
        return this.http.get<CashBox[]>(this.ENDPOINT_CASH_BOX);
      }),
      map((result) => {
        return CashBoxAction.setCashBoxes({ cashBoxes: result });
      }),
      catchError(() => EMPTY)
    )
  );

  fetchSelectedCashBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashBoxAction.fetchSelected),
      switchMap(({ cashBoxId }) => {
        return combineLatest([
          this.http.get<CashBox>(`${this.ENDPOINT_CASH_BOX}/${cashBoxId}`),
          this.http.get<BudgetPlan>(
            `${this.ENDPOINT_CASH_BOX}/${cashBoxId}/plans/active`
          ),
        ]);
      }),
      map((value) => {
        value[0].activeBudgetPlan = value[1];
        return CashBoxAction.setSelected({ cashBox: value[0] });
      }),
      catchError(() => EMPTY)
    )
  );

  createCashBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashBoxAction.addCashBox),
      switchMap(({ cashBox }) => {
        return this.http.post(`${this.ENDPOINT_CASH_BOX}`, cashBox).pipe(
          catchError((error: HttpErrorResponse) => {
            return of(
              CashBoxAction.updateCashBoxFail({ error: error.message })
            );
          }),
          map(() => {
            return CashBoxAction.updateCashBoxSuccess({ cashBox });
          })
        );
      })
    )
  );

  updateCashBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashBoxAction.updateCashBox),
      switchMap(({ cashBox, index }) => {
        return this.http
          .put(`${this.ENDPOINT_CASH_BOX}/${index}`, cashBox)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              return of(
                CashBoxAction.updateCashBoxFail({ error: error.message })
              );
            }),
            map(() => {
              return CashBoxAction.updateCashBoxSuccess({ cashBox });
            })
          );
      })
    )
  );

  updateCashBoxSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CashBoxAction.updateCashBoxSuccess),
        tap(() => {
          this.router.navigate(['/cash-boxes']);
        })
      );
    },
    { dispatch: false }
  );

  deleteCashBox$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CashBoxAction.deleteCashBox),
        switchMap(({ index }) => {
          return this.http.delete(`${this.ENDPOINT_CASH_BOX}/${index}`);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
