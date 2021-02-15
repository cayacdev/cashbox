import { CashBox } from '../../../model/cash-box.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as CashBoxAction from './cash-box.actions';
import { CallState, LoadingState } from '../../../store/state';

// TODO: move to 'state' file
export interface State {
  cashBoxes: CashBox[];
  selectedCashBoxId: number;

  loadCashBoxState: CallState;

  // TODO: better move cash box setting here?

  // todo old
  loading: boolean;
  error: string;
}

const initialState: State = {
  cashBoxes: [],
  loadCashBoxState: LoadingState.INIT,
  selectedCashBoxId: null,

  // old
  loading: false,
  error: null,
};
const cashBoxReducer = createReducer(
  initialState,
  on(CashBoxAction.loadCashBoxes, (state) => {
    return { ...state, loadCashBoxState: LoadingState.LOADING };
  }),
  on(CashBoxAction.loadCashBoxesSuccess, (state, { cashBoxes }) => {
    return { ...state, cashBoxes, loadCashBoxState: LoadingState.LOADED };
  }),
  on(CashBoxAction.loadCashBoxesFail, (state, { error }) => {
    return { ...state, loadCashBoxState: { errorMsg: 'Failed to load cash boxes' } };
  }),
  on(CashBoxAction.addCashBox, CashBoxAction.updateCashBox, CashBoxAction.deleteCashBox, (state) => {
    return { ...state, loadCashBoxState: LoadingState.LOADING };
  }),
  on(CashBoxAction.updateCashBoxFail, (state) => {
    return { ...state, loadCashBoxState: { errorMsg: 'Failed to update cash boxes' } };
  }),
  on(CashBoxAction.setSelected, (state, { cashBoxId }) => {
    return { ...state, selectedCashBoxId: cashBoxId };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return cashBoxReducer(state, action);
}
