import { createAction, props } from '@ngrx/store';
import { CashBox } from '../cash-box.model';

export const setCashBoxes = createAction(
  '[CashBox] set',
  props<{ cashBoxes: CashBox[] }>()
);

export const fetchCashBoxes = createAction('[CashBox] fetch');

export const addCashBox = createAction(
  '[CashBox] add',
  props<{ cashBox: CashBox }>()
);

export const updateCashBox = createAction(
  '[CashBox] update',
  props<{ index: number; cashBox: CashBox }>()
);

export const deleteCashBox = createAction(
  '[CashBox] delete',
  props<{ index: number }>()
);

export const updateCashBoxFail = createAction(
  '[CashBox] add|update fail',
  props<{ error: string }>()
);

export const updateCashBoxSuccess = createAction(
  '[CashBox] add|update success',
  props<{ cashBox: CashBox }>()
);
