import { BudgetPlan, BudgetPlanReport } from '../../model/budget-plan.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as BudgetPlanAction from './budget-plan.actions';
import {
  addBudgetPlan,
  addBudgetPlanEntry,
  deleteBudgetPlan,
  deleteBudgetPlanEntry,
  loadActiveBudgetPlan,
  loadActiveBudgetPlanFail,
  loadActiveBudgetPlanSuccess,
  loadBudgetPlans,
  loadBudgetPlansFail,
  loadBudgetPlansSuccess,
  setSelectedBudgetPlan,
  updateBudgetPlan,
  updateBudgetPlanEntry,
  updateBudgetPlanEntryFail,
  updateBudgetPlanFail,
} from './budget-plan.actions';
import { BudgetPlanEntry } from '../../model/budget-plan-entry.model';
import { CallState, LoadingState } from '../../store/state';

export interface State {
  budgetPlans: BudgetPlan[];
  activeBudgetPlanId: number;
  selectedBudgetPlanId: number;
  budgetPlansEntries: { [budgetPlanId: number]: BudgetPlanEntry[] };
  budgetPlansReports: { [budgetPlanId: number]: BudgetPlanReport };

  loadBudgetPlansState: CallState;
  loadActiveBudgetPlanState: CallState;
  loadBudgetPlanEntriesState: CallState;
  loadBudgetPlanReportsState: CallState;

  // todo deprecated
  loading: boolean;
  error: string;
}

const initialState: State = {
  budgetPlans: [],
  activeBudgetPlanId: null,
  selectedBudgetPlanId: null,
  budgetPlansEntries: {},
  budgetPlansReports: {},
  loadBudgetPlansState: LoadingState.INIT,
  loadActiveBudgetPlanState: LoadingState.INIT,
  loadBudgetPlanEntriesState: LoadingState.INIT,
  loadBudgetPlanReportsState: LoadingState.INIT,

  // todo deprecated
  loading: false,
  error: null,
};

const budgetPlanReducer = createReducer(
  initialState,
  on(loadBudgetPlans, (state) => {
    return { ...state, loadBudgetPlansState: LoadingState.LOADING };
  }),
  on(loadBudgetPlansSuccess, (state, { budgetPlans }) => {
    return { ...state, loadBudgetPlansState: LoadingState.LOADED, budgetPlans };
  }),
  on(loadBudgetPlansFail, (state) => {
    return { ...state, loadBudgetPlansState: { errorMsg: 'Failed to load budget plans' } };
  }),
  on(addBudgetPlan, updateBudgetPlan, deleteBudgetPlan, (state) => {
    return { ...state, loadBudgetPlansState: LoadingState.LOADING };
  }),
  on(updateBudgetPlanFail, (state) => {
    return { ...state, loadBudgetPlansState: { errorMsg: 'Failed to update budget plan' } };
  }),
  on(setSelectedBudgetPlan, (state, { id }) => {
    return { ...state, selectedBudgetPlanId: id };
  }),

  // todo feature active budget plan

  on(loadActiveBudgetPlan, (state) => {
    return { ...state, loadActiveBudgetPlanState: LoadingState.LOADING };
  }),
  on(loadActiveBudgetPlanSuccess, (state, { budgetPlan }) => {
    return { ...state, loadActiveBudgetPlanState: LoadingState.LOADED, activeBudgetPlanId: budgetPlan?.id };
  }),
  on(loadActiveBudgetPlanFail, (state) => {
    return { ...state, loadActiveBudgetPlanState: { errorMsg: 'Failed to load active budget plan' } };
  }),

  // todo feature budget plan entries

  on(BudgetPlanAction.loadBudgetPlanEntries, (state) => {
    return { ...state, loadBudgetPlanEntriesState: LoadingState.LOADING };
  }),
  on(BudgetPlanAction.loadBudgetPlanEntriesSuccess, (state, { budgetPlanId, entries }) => {
    return { ...state, loadBudgetPlanEntriesState: LoadingState.LOADED, budgetPlansEntries: { [budgetPlanId]: entries } };
  }),
  on(BudgetPlanAction.loadBudgetPlanEntriesFail, (state, { error }) => {
    return { ...state, loadBudgetPlanEntriesState: { errorMsg: 'Failed to load budget plan entries' } };
  }),
  on(addBudgetPlanEntry, updateBudgetPlanEntry, deleteBudgetPlanEntry, (state) => {
    return { ...state, loadBudgetPlanEntriesState: LoadingState.LOADING };
  }),
  on(updateBudgetPlanEntryFail, (state) => {
    return { ...state, loadBudgetPlanEntriesState: { errorMsg: 'Failed to update budget plan' } };
  }),

  // todo feature budget plan report

  on(BudgetPlanAction.loadBudgetPlanReport, (state) => {
    return { ...state, loadBudgetPlanReportsState: LoadingState.LOADING };
  }),
  on(BudgetPlanAction.loadBudgetPlanReportSuccess, (state, { budgetPlanId, report }) => {
    return { ...state, loadBudgetPlanReportsState: LoadingState.LOADED, budgetPlansReports: { [budgetPlanId]: report } };
  }),
  on(BudgetPlanAction.loadBudgetPlanReportFail, (state, { error }) => {
    return { ...state, loadBudgetPlanReportsState: { errorMsg: 'Failed to load budget plan report' } };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return budgetPlanReducer(state, action);
}
