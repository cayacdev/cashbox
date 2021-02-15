import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromCashBoxes from '../cash-box/store/cash-boxes/cash-box.reducer';
import * as fromBudgetPlan from '../budget-plan/store/budget-plan.reducer';

export interface AppState {
  auth: fromAuth.State;
  cashBoxes: fromCashBoxes.State;
  budgetPlan: fromBudgetPlan.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  cashBoxes: fromCashBoxes.reducer,
  budgetPlan: fromBudgetPlan.reducer,
};
