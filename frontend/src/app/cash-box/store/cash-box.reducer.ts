import { CashBox } from '../cash-box.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as CashBoxAction from './cash-box.actions';

export interface State {
  cashBoxes: CashBox[];
  loading: boolean;
  error: string;
  selectedCashBox: CashBox;
}

const initialState: State = {
  cashBoxes: [],
  loading: false,
  error: null,
  selectedCashBox: null,
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
  // TODO rename this method to fetchCashBoxDetails
  on(CashBoxAction.fetchSelected, (state) => {
    return { ...state, loading: true };
  }),
  on(CashBoxAction.setSelected, (state, { cashBox }) => {
    // TODO: change this to set the id of the cash box so the selected box can be fetched in the array
    return { ...state, loading: false, selectedCashBox: cashBox };
  }),
  on(CashBoxAction.addCashBox, (state) => {
    return { ...state, loading: true };
  }),
  // FIXME: the cash box id is given but it is used as a index
  on(CashBoxAction.updateCashBox, (state, { index, cashBox }) => {
    return {
      ...state,
      loading: true,
      cashBoxes: updateOrCreate(state, index, cashBox),
    };
  }),
  // FIXME: the cash box id is given but it is used as a index
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
