import { createAction, props } from '@ngrx/store';
import { CashBox, CashBoxSettings } from '../../model/cash-box.model';

export const setCashBoxes = createAction(
  '[CashBox] set',
  props<{ cashBoxes: CashBox[] }>()
);

export const fetchCashBoxes = createAction('[CashBox] fetch');

export const setSelected = createAction(
  '[CashBox] set selected cash box',
  props<{ cashBox: CashBox }>()
);

export const fetchCashBoxDetails = createAction(
  '[CashBox] fetch cash box details',
  props<{ cashBoxId: number }>()
);

export const addCashBox = createAction(
  '[CashBox] add',
  props<{ cashBox: CashBox }>()
);

export const updateCashBox = createAction(
  '[CashBox] update',
  props<{ cashBoxId: number; cashBox: CashBox }>()
);

export const deleteCashBox = createAction(
  '[CashBox] delete',
  props<{ cashBoxId: number }>()
);

export const updateCashBoxFail = createAction(
  '[CashBox] add|update fail',
  props<{ error: string }>()
);

export const updateCashBoxSuccess = createAction(
  '[CashBox] add|update success',
  props<{ cashBox: CashBox }>()
);

export const fetchCashBoxSettings = createAction(
  '[CashBox] fetch cash box settings',
  props<{ cashBoxId: number }>()
);

export const setCashBoxSettings = createAction(
  '[CashBox] set cash box settings',
  props<{ cashBoxId: number; settings: CashBoxSettings }>()
);

export const loadCashBoxSettingsFail = createAction(
  '[CashBox] load cash box settings fail'
);

export const addCashBoxDescription = createAction(
  '[CashBox] add cash box description',
  props<{ cashBoxId: number; value: string }>()
);

export const removeCashBoxDescription = createAction(
  '[CashBox] remove cash box description',
  props<{ cashBoxId: number; descriptionId: number }>()
);

export const updateCashBoxDescriptionSuccess = createAction(
  '[CashBox] update cash box description success',
  props<{ cashBoxId: number }>()
);

export const updateCashBoxDescriptionFail = createAction(
  '[CashBox] update cash box description fail',
  props<{ cashBoxId: number }>()
);
