import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { BudgetPlan, BudgetPlanReport } from '../../model/budget-plan.model';
import {
  addBudgetPlan,
  addBudgetPlanEntry,
  deleteBudgetPlan,
  deleteBudgetPlanEntry,
  loadActiveBudgetPlan,
  loadActiveBudgetPlanFail,
  loadActiveBudgetPlanSuccess,
  loadBudgetPlanEntries,
  loadBudgetPlanEntriesFail,
  loadBudgetPlanEntriesSuccess,
  loadBudgetPlanReport,
  loadBudgetPlanReportFail,
  loadBudgetPlanReportSuccess,
  loadBudgetPlans,
  loadBudgetPlansFail,
  loadBudgetPlansSuccess,
  updateBudgetPlan,
  updateBudgetPlanEntry,
  updateBudgetPlanEntryFail,
  updateBudgetPlanEntrySuccess,
  updateBudgetPlanFail,
  updateBudgetPlanSuccess,
} from './budget-plan.actions';

@Injectable()
export class BudgetPlanEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}

  loadBudgetPlans$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBudgetPlans),
      switchMap(({ cashBoxId }) => {
        return this.http.get<BudgetPlan[]>(`${BudgetPlanEffects.getEndpoint(cashBoxId)}`).pipe(
          map((result) => loadBudgetPlansSuccess({ budgetPlans: result })),
          catchError((err: HttpErrorResponse) => of(loadBudgetPlansFail({ error: err.message })))
        );
      })
    );
  });

  addBudgetPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBudgetPlan),
      switchMap(({ cashBoxId, budgetPlan }) => {
        return this.http.post(`${BudgetPlanEffects.getEndpoint(cashBoxId)}`, budgetPlan).pipe(
          map(() => updateBudgetPlanSuccess({ cashBoxId, budgetPlan })),
          catchError((error: HttpErrorResponse) => of(updateBudgetPlanFail({ cashBoxId, error: error.message })))
        );
      })
    )
  );

  updateBudgetPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBudgetPlan),
      switchMap(({ cashBoxId, budgetPlan, index }) => {
        return this.http.put(`${BudgetPlanEffects.getEndpoint(cashBoxId)}/${index}`, budgetPlan).pipe(
          map(() => updateBudgetPlanSuccess({ cashBoxId, budgetPlan })),
          catchError((error: HttpErrorResponse) => of(updateBudgetPlanFail({ cashBoxId, error: error.message })))
        );
      })
    )
  );

  deleteBudgetPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteBudgetPlan),
      switchMap(({ index, cashBoxId }) => {
        return this.http.delete(`${BudgetPlanEffects.getEndpoint(cashBoxId)}/${index}`).pipe(
          map(() => updateBudgetPlanSuccess({ budgetPlan: null, cashBoxId })),
          catchError((error: HttpErrorResponse) => of(updateBudgetPlanFail({ cashBoxId, error: error.message })))
        );
      })
    );
  });

  updateBudgetPlanSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(updateBudgetPlanSuccess),
        tap(({ cashBoxId }) => {
          this.router.navigate([`/cash-boxes/${cashBoxId}`]);
        })
      );
    },
    { dispatch: false }
  );

  // todo feature load active budget plan

  loadActiveBudgetPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActiveBudgetPlan),
      switchMap(({ cashBoxId }) => {
        return this.http.get<BudgetPlan>(`${BudgetPlanEffects.getEndpoint(cashBoxId)}/active`).pipe(
          map((budgetPlan) => loadActiveBudgetPlanSuccess({ budgetPlan })),
          catchError((error: HttpErrorResponse) => of(loadActiveBudgetPlanFail({ error: error.message })))
        );
      })
    )
  );

  // todo feature entries

  loadEntries = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBudgetPlanEntries),
      switchMap(({ budgetPlanId, cashBoxId }) => {
        return this.http.get<BudgetPlan>(`${BudgetPlanEffects.getEndpoint(cashBoxId)}/${budgetPlanId}`).pipe(
          map((budgetPlan) => loadBudgetPlanEntriesSuccess({ budgetPlanId: budgetPlan.id, entries: budgetPlan.entries })),
          catchError((err: HttpErrorResponse) => of(loadBudgetPlanEntriesFail({ error: err.message })))
        );
      })
    )
  );

  addEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBudgetPlanEntry),
      switchMap(({ cashBoxId, budgetPlanId, entry }) => {
        return this.http.post(`${BudgetPlanEffects.getEntryEndpoint(cashBoxId, budgetPlanId)}/entries`, entry).pipe(
          map(() => updateBudgetPlanEntrySuccess({ cashBoxId, budgetPlanId })),
          catchError((error: HttpErrorResponse) => of(updateBudgetPlanEntryFail({ error: error.message })))
        );
      })
    )
  );

  updateEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBudgetPlanEntry),
      switchMap(({ cashBoxId, budgetPlanId, budgetPlanEntryId, entry }) => {
        return this.http.put(`${BudgetPlanEffects.getEntryEndpoint(cashBoxId, budgetPlanId)}/entries/${budgetPlanEntryId}`, entry).pipe(
          map(() => updateBudgetPlanEntrySuccess({ cashBoxId, budgetPlanId })),
          catchError((error: HttpErrorResponse) => of(updateBudgetPlanEntryFail({ error: error.message })))
        );
      })
    )
  );

  deleteEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBudgetPlanEntry),
      switchMap(({ cashBoxId, budgetPlanId, budgetPlanEntryId }) => {
        return this.http.delete(`${BudgetPlanEffects.getEntryEndpoint(cashBoxId, budgetPlanId)}/entries/${budgetPlanEntryId}`).pipe(
          map(() => updateBudgetPlanEntrySuccess({ cashBoxId, budgetPlanId })),
          catchError((error: HttpErrorResponse) => of(updateBudgetPlanEntryFail({ error: error.message })))
        );
      })
    )
  );

  updateBudgetPlanEntrySuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateBudgetPlanEntrySuccess),
      map(({ cashBoxId, budgetPlanId }) => {
        return loadBudgetPlanEntries({ cashBoxId, budgetPlanId });
      })
    );
  });

  // todo report feature

  loadBudgetPlanReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBudgetPlanReport),
      switchMap(({ cashBoxId, budgetPlanId }) => {
        return this.http.get<BudgetPlanReport>(`${BudgetPlanEffects.getEndpoint(cashBoxId)}/${budgetPlanId}/reports`).pipe(
          map((report) => loadBudgetPlanReportSuccess({ report, budgetPlanId })),
          catchError((error: HttpErrorResponse) => of(loadBudgetPlanReportFail({ error: error.message })))
        );
      })
    )
  );

  private static getEndpoint(cashBoxId: number): string {
    return `${environment.backendDomain}/v1/cash-boxes/${cashBoxId}/plans`;
  }

  private static getEntryEndpoint(cashBoxId: number, budgetPlanId: number): string {
    return `${this.getEndpoint(cashBoxId)}/${budgetPlanId}`;
  }
}
