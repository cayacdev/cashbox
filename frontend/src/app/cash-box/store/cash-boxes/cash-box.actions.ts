import { createAction, props } from '@ngrx/store';
import { CashBox } from '../../../model/cash-box.model';

const LOAD_CASH_BOXES = '[CashBox] load cash boxes';
const SET_SELECTED_CASH_BOX = '[CashBox] set selected cash box';
const LOAD_CASH_BOXES_SUCCESS = '[CashBox] load cash boxes success';
const LOAD_CASH_BOXES_FAIL = '[CashBox] load cash boxes fail';
const ADD_CASH_BOX = '[CashBox] add cash box';
const UPDATE_CASH_BOX = '[CashBox] update cash box';
const DELETE_CASH_BOX = '[CashBox] delete cash box';
const UPDATE_CASH_BOX_SUCCESS = '[CashBox] add|update|delete cash box success';
const UPDATE_CASH_BOX_FAIL = '[CashBox] add|update|delete cash box fail';

export const loadCashBoxes = createAction(LOAD_CASH_BOXES);

export const loadCashBoxesSuccess = createAction(LOAD_CASH_BOXES_SUCCESS, props<{ cashBoxes: CashBox[] }>());

export const loadCashBoxesFail = createAction(LOAD_CASH_BOXES_FAIL, props<{ error: string }>());

export const setSelectedCashBox = createAction(SET_SELECTED_CASH_BOX, props<{ cashBoxId: number }>());

export const addCashBox = createAction(ADD_CASH_BOX, props<{ cashBox: CashBox }>());

export const updateCashBox = createAction(UPDATE_CASH_BOX, props<{ cashBox: CashBox }>());

export const deleteCashBox = createAction(DELETE_CASH_BOX, props<{ cashBox: CashBox }>());

export const updateCashBoxSuccess = createAction(UPDATE_CASH_BOX_SUCCESS);

export const updateCashBoxFail = createAction(UPDATE_CASH_BOX_FAIL, props<{ error: string }>());
