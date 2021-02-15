import { CashBox, CashBoxSettings } from '../../model/cash-box.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as CashBoxAction from './cash-box.actions';
import { CallState, LoadingState } from '../../store/state';

// TODO: move to 'state' file
export interface State {
  cashBoxes: CashBox[];
  selectedCashBoxId: number;

  loadCashBoxState: CallState;

  // TODO: better move cash box setting here?
  settings: { [cashBoxId: number]: CashBoxSettings };
  loadCashBoxSettingState: CallState;

  // todo old
  loading: boolean;
  error: string;
}

const initialState: State = {
  cashBoxes: [],
  loading: false,
  error: null,
  selectedCashBoxId: null,

  // new
  loadCashBoxState: LoadingState.INIT,
  loadCashBoxSettingState: LoadingState.INIT,
  settings: {},
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
  on(CashBoxAction.loadCashBoxSettingsFail, (state) => {
    return { ...state, loadCashBoxState: { errorMsg: 'Failed to load cash boxes settings' } };
  }),
  on(CashBoxAction.setSelected, (state, { cashBoxId }) => {
    return { ...state, selectedCashBoxId: cashBoxId };
  }),

  // TODO: move to own reducer
  on(CashBoxAction.loadCashBoxSettings, (state) => {
    return { ...state, loadCashBoxSettingState: LoadingState.LOADING };
  }),
  on(CashBoxAction.addCashBoxDescription, CashBoxAction.removeCashBoxDescription, (state) => {
    return { ...state, loadCashBoxSettingState: LoadingState.LOADING };
  }),
  on(CashBoxAction.loadCashBoxSettingsSuccess, (state, { cashBoxId, settings }) => {
    return { ...state, settings: { ...settings, [cashBoxId]: settings }, loadCashBoxSettingState: LoadingState.LOADED };
  }),
  on(CashBoxAction.loadCashBoxSettingsFail, (state) => {
    return { ...state, loadCashBoxSettingState: { errorMsg: 'Failed to load cash box settings' } };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return cashBoxReducer(state, action);
}
