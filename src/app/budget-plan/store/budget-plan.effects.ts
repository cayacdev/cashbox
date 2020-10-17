import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';
import { BudgetPlan } from '../budget-plan.model';
import * as BudgetPlanAction from './budget-plan.actions';

@Injectable()
export class BudgetPlanEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  fetchCashBoxes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetPlanAction.fetchBudgetPlans),
      switchMap(({ cashBoxId }) => {
        return this.http.get<BudgetPlan[]>(
          `${BudgetPlanEffects.getEndpoint(cashBoxId)}`
        );
      }),
      map((result) => {
        return BudgetPlanAction.setBudgetPlans({ budgetPlans: result });
      }),
      catchError(() => EMPTY)
    )
  );

  fetchEntries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetPlanAction.fetchEntries),
      switchMap(({ budgetPlanId, cashBoxId }) => {
        return this.http.get<BudgetPlan>(
          `${BudgetPlanEffects.getEndpoint(cashBoxId)}/${budgetPlanId}`
        );
      }),
      map((budgetPlan) => {
        return BudgetPlanAction.setEntries({
          budgetPlanId: budgetPlan.id,
          entries: budgetPlan.entries,
        });
      })
    )
  );

  createCashBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetPlanAction.addBudgetPlan),
      switchMap(({ cashBoxId, budgetPlan }) => {
        return this.http
          .post(`${BudgetPlanEffects.getEndpoint(cashBoxId)}`, budgetPlan)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              return of(
                BudgetPlanAction.updateBudgetPlanFail({
                  cashBoxId,
                  error: error.message,
                })
              );
            }),
            map(() => {
              return BudgetPlanAction.updateBudgetPlanSuccess({
                cashBoxId,
                budgetPlan,
              });
            })
          );
      })
    )
  );

  updateCashBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetPlanAction.updateBudgetPlan),
      switchMap(({ cashBoxId, budgetPlan, index }) => {
        return this.http
          .put(
            `${BudgetPlanEffects.getEndpoint(cashBoxId)}/${index}`,
            budgetPlan
          )
          .pipe(
            catchError((error: HttpErrorResponse) => {
              return of(
                BudgetPlanAction.updateBudgetPlanFail({
                  cashBoxId,
                  error: error.message,
                })
              );
            }),
            map(() => {
              return BudgetPlanAction.updateBudgetPlanSuccess({
                cashBoxId,
                budgetPlan,
              });
            })
          );
      })
    )
  );

  updateCashBoxSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BudgetPlanAction.updateBudgetPlanSuccess),
        tap(({ cashBoxId }) => {
          this.router.navigate([`/cash-boxes/${cashBoxId}`]);
        })
      );
    },
    { dispatch: false }
  );

  deleteCashBox$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BudgetPlanAction.deleteBudgetPlan),
        switchMap(({ index, cashBoxId }) => {
          return this.http.delete(
            `${BudgetPlanEffects.getEndpoint(cashBoxId)}/${index}`
          );
        })
      );
    },
    { dispatch: false }
  );

  private static getEndpoint(cashBoxId: number): string {
    return `${environment.backendDomain}/v1/cash-boxes/${cashBoxId}/plans`;
  }
}
