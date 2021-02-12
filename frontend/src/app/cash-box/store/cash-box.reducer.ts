import { CashBox, CashBoxSettings } from '../../model/cash-box.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as CashBoxAction from './cash-box.actions';

// TODO move this globally so this is reusable
export const enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export interface ErrorState {
  errorMsg: string;
}

export type CallState = LoadingState | ErrorState;

// TODO: move to 'state' file
export interface State {
  cashBoxes: CashBox[];
  loading: boolean;
  error: string;
  selectedCashBoxId: number;

  // new
  loadCashBoxState: CallState;

  // TODO: better move cash box setting here?
  settings: { [cashBoxId: number]: CashBoxSettings };
  loadCashBoxSettingState: CallState;
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
  on(CashBoxAction.addCashBox, CashBoxAction.updateCashBox, CashBoxAction.deleteCashBox, (state) => {
    return { ...state, loadCashBoxState: LoadingState.LOADING };
  }),
  on(CashBoxAction.updateCashBoxFail, (state) => {
    return { ...state, loadCashBoxState: { errorMsg: 'Failed to update cash boxes' } };
  }),
  on(CashBoxAction.loadCashBoxSettingsFail, (state) => {
    return { ...state, loadCashBoxState: { errorMsg: 'Failed to load cash boxes settings' } };
  }),
  on(CashBoxAction.setSelected, (state, { cashBox }) => {
    return { ...state, selectedCashBoxId: cashBox.id };
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
