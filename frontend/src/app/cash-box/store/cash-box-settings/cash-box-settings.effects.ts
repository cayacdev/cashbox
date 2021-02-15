import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { PredefinedDescription } from '../../../model/cash-box.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  addCashBoxDescription,
  loadCashBoxSettings,
  loadCashBoxSettingsFail,
  loadCashBoxSettingsSuccess,
  removeCashBoxDescription,
  updateCashBoxDescriptionFail,
  updateCashBoxDescriptionSuccess,
} from './cash-box-settings.actions';

@Injectable()
export class CashBoxSettingsEffects {
  private readonly ENDPOINT_CASH_BOX = `${environment.backendDomain}/v1/cash-boxes`;

  fetchCashBoxSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCashBoxSettings),
      switchMap(({ cashBoxId }) => {
        return combineLatest([this.http.get<PredefinedDescription[]>(`${this.ENDPOINT_CASH_BOX}/${cashBoxId}/settings/descriptions`)]).pipe(
          map((settings) => {
            return loadCashBoxSettingsSuccess({
              cashBoxId,
              settings: { descriptions: settings[0] },
            });
          }),
          catchError(() => {
            return of(loadCashBoxSettingsFail());
          })
        );
      })
    );
  });

  addCashBoxDescription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addCashBoxDescription),
      switchMap(({ cashBoxId, value }) => {
        return this.http.post(`${this.ENDPOINT_CASH_BOX}/${cashBoxId}/settings/descriptions`, { value }).pipe(
          map(() => {
            return updateCashBoxDescriptionSuccess({
              cashBoxId,
            });
          }),
          catchError((err) => {
            return of(updateCashBoxDescriptionFail({ cashBoxId, error: err.message }));
          })
        );
      })
    );
  });

  removeCashBoxDescription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeCashBoxDescription),
      switchMap(({ cashBoxId, descriptionId }) => {
        return this.http.delete(`${this.ENDPOINT_CASH_BOX}/${cashBoxId}/settings/descriptions/${descriptionId}`).pipe(
          map(() => {
            return updateCashBoxDescriptionSuccess({
              cashBoxId,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(updateCashBoxDescriptionFail({ cashBoxId, error: err.message }));
          })
        );
      })
    );
  });

  updateCashBoxDescriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCashBoxDescriptionSuccess, updateCashBoxDescriptionFail),
      map(({ cashBoxId }) => {
        return loadCashBoxSettings({ cashBoxId });
      })
    );
  });

  constructor(private actions$: Actions, private http: HttpClient) {}
}
