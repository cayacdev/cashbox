import { CashBox } from '../cash-box.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as CashBoxAction from './cash-box.actions';

export interface State {
  cashBoxes: CashBox[];
  loading: boolean;
  error: string;
}

const initialState: State = {
  cashBoxes: [],
  loading: false,
  error: null,
};

function updateCashBoxes(state, index: number, cashBox: CashBox): CashBox[] {
  const updatedCashBox = {
    ...state.cashBoxes[index],
    ...cashBox,
  };

  const updatedCashBoxes = [...state.cashBoxes];
  updatedCashBoxes[index] = updatedCashBox;
  return updatedCashBoxes;
}

const cashBoxReducer = createReducer(
  initialState,
  on(CashBoxAction.fetchCashBoxes, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CashBoxAction.setCashBoxes, (state, { cashBoxes }) => {
    return {
      ...state,
      loading: false,
      cashBoxes,
    };
  }),
  on(CashBoxAction.addCashBox, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CashBoxAction.updateCashBox, (state, { index, cashBox }) => {
    return {
      ...state,
      loading: true,
      cashBoxes: updateCashBoxes(state, index, cashBox),
    };
  }),
  on(CashBoxAction.deleteCashBox, (state, { index }) => {
    return {
      ...state,
      cashBoxes: state.cashBoxes.filter((cashBox) => cashBox.id !== index),
    };
  }),
  on(CashBoxAction.updateCashBoxSuccess, (state, { cashBox }) => {
    return {
      ...state,
      loading: false,
      cashBoxes: [...state.cashBoxes, cashBox],
    };
  }),
  on(CashBoxAction.updateCashBoxFail, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return cashBoxReducer(state, action);
}
