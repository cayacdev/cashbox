import { CashBox } from '../cash-box.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as CashBoxAction from './cash-box.actions';

export interface State {
  cashBoxes: CashBox[];
  loading: boolean;
  error: string;
  selectedCashBoxId: number;
}

const initialState: State = {
  cashBoxes: [],
  loading: false,
  error: null,
  selectedCashBoxId: null,
};

function updateOrCreate(state, id: number, cashBox: CashBox): CashBox[] {
  let updatedCashBoxes = [...state.cashBoxes];
  const index = state.cashBoxes.findIndex((c) => c.id == id);
  if (index !== -1) {
    updatedCashBoxes[index] = {
      ...state.cashBoxes[index],
      ...cashBox,
    };
  } else {
    updatedCashBoxes = [...updatedCashBoxes, { ...cashBox, id }];
  }
  return updatedCashBoxes;
}

const mergeById = (array1, array2) =>
  array1.map((itm) => ({
    ...array2.find((item) => item.id === itm.id && item),
    ...itm,
  }));

const cashBoxReducer = createReducer(
  initialState,
  on(CashBoxAction.fetchCashBoxes, (state) => {
    return { ...state, loading: true };
  }),
  on(CashBoxAction.setCashBoxes, (state, { cashBoxes }) => {
    return {
      ...state,
      loading: false,
      cashBoxes: mergeById([...cashBoxes], [...state.cashBoxes]),
    };
  }),
  on(CashBoxAction.fetchCashBoxDetails, (state) => {
    return { ...state, loading: true };
  }),
  on(CashBoxAction.setSelected, (state, { cashBox }) => {
    return {
      ...state,
      loading: false,
      selectedCashBoxId: cashBox.id,
      cashBoxes: updateOrCreate(state, cashBox.id, cashBox),
    };
  }),
  on(CashBoxAction.addCashBox, (state) => {
    return { ...state, loading: true };
  }),
  on(CashBoxAction.updateCashBox, (state, { cashBoxId, cashBox }) => {
    return {
      ...state,
      loading: true,
      cashBoxes: updateOrCreate(state, cashBoxId, cashBox),
    };
  }),
  on(CashBoxAction.deleteCashBox, (state, { cashBoxId }) => {
    return {
      ...state,
      cashBoxes: state.cashBoxes.filter((cashBox) => cashBox.id !== cashBoxId),
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
    return { ...state, loading: false, error };
  }),
  on(CashBoxAction.setCashBoxSettings, (state, { cashBoxId, settings }) => {
    const cashBox = {
      id: cashBoxId,
      settings,
    };
    return {
      ...state,
      cashBoxes: updateOrCreate(state, cashBoxId, cashBox),
    };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return cashBoxReducer(state, action);
}
