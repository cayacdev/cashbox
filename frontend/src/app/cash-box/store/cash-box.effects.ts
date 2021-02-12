import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CashBoxAction from './cash-box.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { combineLatest, of } from 'rxjs';
import { Router } from '@angular/router';
import { PredefinedDescription } from '../../model/cash-box.model';
import { environment } from '../../../environments/environment';
import { CashBoxConnector } from '../connectors/cash-box.connector';

@Injectable()
export class CashBoxEffects {
  private readonly ENDPOINT_CASH_BOX = `${environment.backendDomain}/v1/cash-boxes`;

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

  // TODO: move to own effects
  fetchCashBoxSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashBoxAction.loadCashBoxSettings),
      switchMap(({ cashBoxId }) => {
        return combineLatest([this.http.get<PredefinedDescription[]>(`${this.ENDPOINT_CASH_BOX}/${cashBoxId}/settings/descriptions`)]).pipe(
          map((settings) => {
            return CashBoxAction.loadCashBoxSettingsSuccess({
              cashBoxId,
              settings: { descriptions: settings[0] },
            });
          }),
          catchError(() => {
            return of(CashBoxAction.loadCashBoxSettingsFail());
          })
        );
      })
    );
  });

  addCashBoxDescription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashBoxAction.addCashBoxDescription),
      switchMap(({ cashBoxId, value }) => {
        return this.http.post(`${this.ENDPOINT_CASH_BOX}/${cashBoxId}/settings/descriptions`, { value }).pipe(
          map(() => {
            return CashBoxAction.updateCashBoxDescriptionSuccess({
              cashBoxId,
            });
          }),
          catchError((err) => {
            return of(CashBoxAction.updateCashBoxDescriptionFail({ cashBoxId, error: err.message }));
          })
        );
      })
    );
  });

  removeCashBoxDescription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashBoxAction.removeCashBoxDescription),
      switchMap(({ cashBoxId, descriptionId }) => {
        return this.http.delete(`${this.ENDPOINT_CASH_BOX}/${cashBoxId}/settings/descriptions/${descriptionId}`).pipe(
          map(() => {
            return CashBoxAction.updateCashBoxDescriptionSuccess({
              cashBoxId,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(CashBoxAction.updateCashBoxDescriptionFail({ cashBoxId, error: err.message }));
          })
        );
      })
    );
  });

  updateCashBoxDescriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashBoxAction.updateCashBoxDescriptionSuccess, CashBoxAction.updateCashBoxDescriptionFail),
      map(({ cashBoxId }) => {
        return CashBoxAction.loadCashBoxSettings({ cashBoxId });
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
