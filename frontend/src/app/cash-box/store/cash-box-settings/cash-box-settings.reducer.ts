import { createReducer, on } from '@ngrx/store';
import { CashBoxSettings } from '../../../model/cash-box.model';
import { CallState, LoadingState } from '../../../store/state';
import {
  addCashBoxDescription,
  loadCashBoxSettings,
  loadCashBoxSettingsFail,
  loadCashBoxSettingsSuccess,
  removeCashBoxDescription,
} from './cash-box-settings.actions';

export const cashBoxSettingsFeatureKey = 'cashBoxSettings';

export interface State {
  settings: { [cashBoxId: number]: CashBoxSettings };
  loadCashBoxSettingState: CallState;
}

export const initialState: State = {
  loadCashBoxSettingState: LoadingState.INIT,
  settings: {},
};

export const reducer = createReducer(
  initialState,
  on(loadCashBoxSettings, (state) => {
    return { ...state, loadCashBoxSettingState: LoadingState.LOADING };
  }),
  on(addCashBoxDescription, removeCashBoxDescription, (state) => {
    return { ...state, loadCashBoxSettingState: LoadingState.LOADING };
  }),
  on(loadCashBoxSettingsSuccess, (state, { cashBoxId, settings }) => {
    return { ...state, settings: { ...state.settings, [cashBoxId]: settings }, loadCashBoxSettingState: LoadingState.LOADED };
  }),
  on(loadCashBoxSettingsFail, (state) => {
    return { ...state, loadCashBoxSettingState: { errorMsg: 'Failed to load cash box settings' } };
  })
);
