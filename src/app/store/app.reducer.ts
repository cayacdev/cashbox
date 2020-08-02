import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromCashBoxes from '../cashbox/store/cash-box.reducer';

export interface AppState {
  auth: fromAuth.State;
  cashBoxes: fromCashBoxes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  cashBoxes: fromCashBoxes.reducer,
};
