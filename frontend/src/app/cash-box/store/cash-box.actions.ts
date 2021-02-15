import { createAction, props } from '@ngrx/store';
import { CashBox, CashBoxSettings } from '../../model/cash-box.model';

const LOAD_CASH_BOXES = '[CashBox] load cash boxes';
const SET_SELECTED = '[CashBox] set selected cash box';
const LOAD_CASH_BOXES_SUCCESS = '[CashBox] load cash boxes success';
const LOAD_CASH_BOXES_FAIL = '[CashBox] load cash boxes fail';
const ADD = '[CashBox] add cash box';
const UPDATE = '[CashBox] update cash box';
const DELETE = '[CashBox] delete cash box';
const UPDATE_SUCCESS = '[CashBox] add|update|delete success';
const UPDATE_FAIL = '[CashBox] add|update|delete fail';

export const loadCashBoxes = createAction(LOAD_CASH_BOXES);

export const loadCashBoxesSuccess = createAction(LOAD_CASH_BOXES_SUCCESS, props<{ cashBoxes: CashBox[] }>());

export const loadCashBoxesFail = createAction(LOAD_CASH_BOXES_FAIL, props<{ error: string }>());

export const setSelected = createAction(SET_SELECTED, props<{ cashBoxId: number }>());

export const addCashBox = createAction(ADD, props<{ cashBox: CashBox }>());

export const updateCashBox = createAction(UPDATE, props<{ cashBox: CashBox }>());

export const deleteCashBox = createAction(DELETE, props<{ cashBox: CashBox }>());

export const updateCashBoxSuccess = createAction(UPDATE_SUCCESS);

export const updateCashBoxFail = createAction(UPDATE_FAIL, props<{ error: string }>());

// TODO: move to cash box settings

const LOAD_CASH_BOX_SETTINGS = '[CashBox] load cash box settings';
const LOAD_CASH_BOX_SETTINGS_SUCCESS = '[CashBox] load cash box success';
const LOAD_CASH_BOX_SETTINGS_FAIL = '[CashBox] load cash box settings fail';

export const loadCashBoxSettings = createAction(LOAD_CASH_BOX_SETTINGS, props<{ cashBoxId: number }>());

export const loadCashBoxSettingsSuccess = createAction(
  LOAD_CASH_BOX_SETTINGS_SUCCESS,
  props<{ cashBoxId: number; settings: CashBoxSettings }>()
);

export const loadCashBoxSettingsFail = createAction(LOAD_CASH_BOX_SETTINGS_FAIL);

// TODO: move to cash box setting - description

const ADD_DESCRIPTION = '[CashBox] add cash box description';
const REMOVE_DESCRIPTION = '[CashBox] remove cash box description';
const UPDATE_DESCRIPTION_SUCCESS = '[CashBox] update cash box description success';
const UPDATE_DESCRIPTION_FAIL = '[CashBox] update cash box description fail';

export const addCashBoxDescription = createAction(ADD_DESCRIPTION, props<{ cashBoxId: number; value: string }>());

export const removeCashBoxDescription = createAction(REMOVE_DESCRIPTION, props<{ cashBoxId: number; descriptionId: number }>());

export const updateCashBoxDescriptionSuccess = createAction(UPDATE_DESCRIPTION_SUCCESS, props<{ cashBoxId: number }>());

export const updateCashBoxDescriptionFail = createAction(UPDATE_DESCRIPTION_FAIL, props<{ cashBoxId: number; error: string }>());
