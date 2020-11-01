import { BudgetPlan } from '../budget-plan.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as BudgetPlanAction from './budget-plan.actions';

export interface State {
  budgetPlans: BudgetPlan[];
  loading: boolean;
  error: string;
}

function update(state, index: number, budgetPlan: BudgetPlan): BudgetPlan[] {
  const updatedBudgetPlan = {
    ...state.budgetPlans[index],
    ...budgetPlan,
  };

  const updatedBudgetPlans = [...state.budgetPlans];
  updatedBudgetPlans[index] = updatedBudgetPlan;
  return updatedBudgetPlans;
}

const initialState: State = { budgetPlans: [], loading: false, error: null };

const budgetPlanReducer = createReducer(
  initialState,
  on(BudgetPlanAction.fetchBudgetPlans, (state) => {
    return { ...state, loading: true };
  }),
  on(BudgetPlanAction.setBudgetPlans, (state, { budgetPlans }) => {
    return { ...state, loading: false, budgetPlans };
  }),
  on(BudgetPlanAction.fetchEntries, (state) => {
    return { ...state, loading: true };
  }),
  on(BudgetPlanAction.setEntries, (state, { budgetPlanId, entries }) => {
    const indexToUpdate = state.budgetPlans.findIndex(
      (plan) => plan.id === budgetPlanId
    );

    const updatedBudgetPlan = {
      ...state.budgetPlans[indexToUpdate],
      entries,
    };

    const plans = [...state.budgetPlans];
    plans[indexToUpdate] = updatedBudgetPlan;
    return { ...state, loading: false, budgetPlans: plans };
  }),
  on(BudgetPlanAction.fetchReport, (state) => {
    return { ...state, loading: true };
  }),
  on(BudgetPlanAction.setReport, (state, { budgetPlanId, report }) => {
    const indexToUpdate = state.budgetPlans.findIndex(
      (plan) => plan.id === budgetPlanId
    );

    const updatedBudgetPlan = {
      ...state.budgetPlans[indexToUpdate],
      report,
    };

    const plans = [...state.budgetPlans];
    plans[indexToUpdate] = updatedBudgetPlan;
    return { ...state, loading: false, budgetPlans: plans };
  }),
  on(BudgetPlanAction.addBudgetPlan, (state) => {
    return { ...state, loading: true };
  }),
  on(BudgetPlanAction.updateBudgetPlan, (state, { index, budgetPlan }) => {
    return {
      ...state,
      loading: true,
      budgetPlans: update(state, index, budgetPlan),
    };
  }),
  on(BudgetPlanAction.deleteBudgetPlan, (state, { index }) => {
    return {
      ...state,
      budgetPlans: state.budgetPlans.filter(
        (budgetPlan) => budgetPlan.id !== index
      ),
    };
  }),
  on(BudgetPlanAction.updateBudgetPlanSuccess, (state, { budgetPlan }) => {
    return {
      ...state,
      loading: false,
      budgetPlans: [...state.budgetPlans, budgetPlan],
    };
  }),
  on(BudgetPlanAction.updateBudgetPlanFail, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return budgetPlanReducer(state, action);
}
