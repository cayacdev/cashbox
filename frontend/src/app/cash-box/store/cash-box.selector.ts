import { createSelector } from '@ngrx/store';
import { State } from './cash-box.reducer';
import { AppState } from '../../store/app.reducer';

export const getActiveCashBox = createSelector(
  (state: AppState) => state.cashBoxes,
  (state: State) =>
    state.cashBoxes.find((c) => c.id === state.selectedCashBoxId)
);
