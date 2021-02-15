import { createAction, props } from '@ngrx/store';
import { CashBoxSettings } from '../../../model/cash-box.model';

const LOAD_CASH_BOX_SETTINGS = '[CashBox] load cash box settings';
const LOAD_CASH_BOX_SETTINGS_SUCCESS = '[CashBox] load cash box success';
const LOAD_CASH_BOX_SETTINGS_FAIL = '[CashBox] load cash box settings fail';

export const loadCashBoxSettings = createAction(LOAD_CASH_BOX_SETTINGS, props<{ cashBoxId: number }>());

export const loadCashBoxSettingsSuccess = createAction(
  LOAD_CASH_BOX_SETTINGS_SUCCESS,
  props<{ cashBoxId: number; settings: CashBoxSettings }>()
);

export const loadCashBoxSettingsFail = createAction(LOAD_CASH_BOX_SETTINGS_FAIL);

const ADD_DESCRIPTION = '[CashBox] add cash box description';
const REMOVE_DESCRIPTION = '[CashBox] remove cash box description';
const UPDATE_DESCRIPTION_SUCCESS = '[CashBox] update cash box description success';
const UPDATE_DESCRIPTION_FAIL = '[CashBox] update cash box description fail';

export const addCashBoxDescription = createAction(ADD_DESCRIPTION, props<{ cashBoxId: number; value: string }>());

export const removeCashBoxDescription = createAction(REMOVE_DESCRIPTION, props<{ cashBoxId: number; descriptionId: number }>());

export const updateCashBoxDescriptionSuccess = createAction(UPDATE_DESCRIPTION_SUCCESS, props<{ cashBoxId: number }>());

export const updateCashBoxDescriptionFail = createAction(UPDATE_DESCRIPTION_FAIL, props<{ cashBoxId: number; error: string }>());
