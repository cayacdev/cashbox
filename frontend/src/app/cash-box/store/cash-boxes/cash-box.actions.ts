import { createAction, props } from '@ngrx/store';
import { CashBox } from '../../../model/cash-box.model';

const LOAD_CASH_BOXES = '[CashBox] load cash boxes';
const SET_SELECTED_CASH_BOX = '[CashBox] set selected cash box';
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

export const setSelectedCashBox = createAction(SET_SELECTED_CASH_BOX, props<{ cashBoxId: number }>());

export const addCashBox = createAction(ADD, props<{ cashBox: CashBox }>());

export const updateCashBox = createAction(UPDATE, props<{ cashBox: CashBox }>());

export const deleteCashBox = createAction(DELETE, props<{ cashBox: CashBox }>());

export const updateCashBoxSuccess = createAction(UPDATE_SUCCESS);

export const updateCashBoxFail = createAction(UPDATE_FAIL, props<{ error: string }>());
