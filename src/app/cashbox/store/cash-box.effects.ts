import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CashBoxAction from './cash-box.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CashBox } from '../cash-box.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CashBoxEffects {
  fetchCashBoxes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashBoxAction.fetchCashBoxes),
      switchMap(() => {
        return this.http.get<CashBox[]>(
          `${environment.backendDomain}/api/cash-boxes`
        );
      }),
      map((result) => {
        return CashBoxAction.setCashBoxes({ cashBoxes: result });
      }),
      catchError(() => EMPTY)
    )
  );

  createCashBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashBoxAction.addCashBox),
      switchMap(({ cashBox }) => {
        return this.http
          .post(`${environment.backendDomain}/api/cash-boxes`, cashBox)
          .pipe(
            map(() => {
              return CashBoxAction.updateCashBoxSuccess({ cashBox });
            }),
            catchError((error: HttpErrorResponse) => {
              return of(
                CashBoxAction.updateCashBoxFail({ error: error.message })
              );
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
          return this.http.delete(
            `${environment.backendDomain}/api/cash-boxes/${index}`
          );
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
