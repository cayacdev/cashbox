import { createAction, props } from '@ngrx/store';
import { BudgetPlan, BudgetPlanReport } from '../../model/budget-plan.model';
import { BudgetPlanEntry } from '../../model/budget-plan-entry.model';

const LOAD_ACTIVE_BUDGET_PLAN = '[BudgetPlan] load active budget plan';
const LOAD_ACTIVE_BUDGET_PLAN_SUCCESS = '[BudgetPlan] load active budget plan success';
const LOAD_ACTIVE_BUDGET_PLAN_FAIL = '[BudgetPlan] load active budget plan fail';
const LOAD_BUDGET_PLANS = '[BudgetPlan] load budget plans';
const LOAD_BUDGET_PLANS_SUCCESS = '[BudgetPlan] load budget plans success';
const LOAD_BUDGET_PLANS_FAIL = '[BudgetPlan] load budget plans fail';
const SET_SELECTED_BUDGET_PLAN = '[BudgetPlan] set selected budget plan';
const ADD_BUDGET_PLAN = '[BudgetPlan] add budget plan';
const UPDATE_BUDGET_PLAN = '[BudgetPlan] update budget plan';
const DELETE_BUDGET_PLAN = '[BudgetPlan] delete budget plan';
const CLOSE_BUDGET_PLAN = '[BudgetPlan] close budget plan';
const UPDATE_BUDGET_PLAN_SUCCESS = '[BudgetPlan] add|update|delete budget plan success';
const UPDATE_BUDGET_PLAN_FAIL = '[BudgetPlan] add|update|delete budget plan fail';

export const loadActiveBudgetPlan = createAction(LOAD_ACTIVE_BUDGET_PLAN, props<{ cashBoxId: number }>());

export const loadActiveBudgetPlanSuccess = createAction(LOAD_ACTIVE_BUDGET_PLAN_SUCCESS, props<{ budgetPlan: BudgetPlan }>());

export const loadActiveBudgetPlanFail = createAction(LOAD_ACTIVE_BUDGET_PLAN_FAIL, props<{ error: string }>());

export const loadBudgetPlans = createAction(LOAD_BUDGET_PLANS, props<{ cashBoxId: number }>());

export const loadBudgetPlansSuccess = createAction(LOAD_BUDGET_PLANS_SUCCESS, props<{ budgetPlans: BudgetPlan[] }>());

export const loadBudgetPlansFail = createAction(LOAD_BUDGET_PLANS_FAIL, props<{ error: string }>());

export const setSelectedBudgetPlan = createAction(SET_SELECTED_BUDGET_PLAN, props<{ id: number }>());

export const addBudgetPlan = createAction(ADD_BUDGET_PLAN, props<{ cashBoxId: number; budgetPlan: BudgetPlan }>());

export const updateBudgetPlan = createAction(UPDATE_BUDGET_PLAN, props<{ cashBoxId: number; index: number; budgetPlan: BudgetPlan }>());

export const deleteBudgetPlan = createAction(DELETE_BUDGET_PLAN, props<{ cashBoxId: number; index: number }>());

export const closeBudgetPlan = createAction(CLOSE_BUDGET_PLAN, props<{ cashBoxId: number; index: number; close: boolean }>());

export const updateBudgetPlanSuccess = createAction(UPDATE_BUDGET_PLAN_SUCCESS, props<{ cashBoxId: number }>());

export const updateBudgetPlanFail = createAction(UPDATE_BUDGET_PLAN_FAIL, props<{ cashBoxId: number; error: string }>());

// TODO entries feature

const LOAD_BUDGET_PLAN_ENTRIES = '[BudgetPlan] load budget plan entries';
const LOAD_BUDGET_PLAN_ENTRIES_SUCCESS = '[BudgetPlan] load budget plan entries success';
const LOAD_BUDGET_PLAN_ENTRIES_FAIL = '[BudgetPlan] load budget plan entries fail';
const ADD_BUDGET_PLAN_ENTRY = '[BudgetPlan] add budget plan entry';
const UPDATE_BUDGET_PLAN_ENTRY = '[BudgetPlan] update budget plan entry';
const DELETE_BUDGET_PLAN_ENTRY = '[BudgetPlan] delete budget plan entry';
const UPDATE_BUDGET_PLAN_ENTRY_SUCCESS = '[BudgetPlan] add|update|delete budget plan entry success';
const UPDATE_BUDGET_PLAN_ENTRY_FAIL = '[BudgetPlan] add|update|delete budget plan entry fail';

export const loadBudgetPlanEntries = createAction(LOAD_BUDGET_PLAN_ENTRIES, props<{ cashBoxId: number; budgetPlanId: number }>());

export const loadBudgetPlanEntriesSuccess = createAction(
  LOAD_BUDGET_PLAN_ENTRIES_SUCCESS,
  props<{ budgetPlanId: number; entries: BudgetPlanEntry[] }>()
);

export const loadBudgetPlanEntriesFail = createAction(LOAD_BUDGET_PLAN_ENTRIES_FAIL, props<{ error: string }>());

export const addBudgetPlanEntry = createAction(
  ADD_BUDGET_PLAN_ENTRY,
  props<{ cashBoxId: number; budgetPlanId: number; entry: BudgetPlanEntry }>()
);

export const updateBudgetPlanEntry = createAction(
  UPDATE_BUDGET_PLAN_ENTRY,
  props<{
    cashBoxId: number;
    budgetPlanId: number;
    budgetPlanEntryId: number;
    entry: BudgetPlanEntry;
  }>()
);

export const deleteBudgetPlanEntry = createAction(
  DELETE_BUDGET_PLAN_ENTRY,
  props<{
    cashBoxId: number;
    budgetPlanId: number;
    budgetPlanEntryId: number;
  }>()
);

export const updateBudgetPlanEntrySuccess = createAction(
  UPDATE_BUDGET_PLAN_ENTRY_SUCCESS,
  props<{ cashBoxId: number; budgetPlanId: number }>()
);

export const updateBudgetPlanEntryFail = createAction(UPDATE_BUDGET_PLAN_ENTRY_FAIL, props<{ error: string }>());

// todo report feature

const LOAD_BUDGET_PLAN_REPORT = '[BudgetPlan] load budget plan report';
const LOAD_BUDGET_PLAN_REPORT_SUCCESS = '[BudgetPlan] load budget plan report success';
const LOAD_BUDGET_PLAN_REPORT_FAIL = '[BudgetPlan] load budget plan report fail';

export const loadBudgetPlanReport = createAction(LOAD_BUDGET_PLAN_REPORT, props<{ cashBoxId: number; budgetPlanId: number }>());

export const loadBudgetPlanReportSuccess = createAction(
  LOAD_BUDGET_PLAN_REPORT_SUCCESS,
  props<{ budgetPlanId: number; report: BudgetPlanReport }>()
);

export const loadBudgetPlanReportFail = createAction(LOAD_BUDGET_PLAN_REPORT_FAIL, props<{ error: string }>());
