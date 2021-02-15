import { createSelector } from '@ngrx/store';
import { State } from './budget-plan.reducer';
import { AppState } from '../../store/app.reducer';

export const selectActiveBudgetPlan = createSelector(
  (state: AppState) => state.budgetPlan,
  (state: State) => state.budgetPlans.find((plan) => plan.id === state.activeBudgetPlanId)
);
