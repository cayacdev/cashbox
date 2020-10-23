import { createAction, props } from '@ngrx/store';
import { BudgetPlan, BudgetPlanReport } from '../budget-plan.model';
import { BudgetPlanEntry } from '../budget-plan-entry.model';

export const setBudgetPlans = createAction(
  '[BudgetPlan] set',
  props<{ budgetPlans: BudgetPlan[] }>()
);

export const fetchBudgetPlans = createAction(
  '[BudgetPlan] fetch',
  props<{ cashBoxId: number }>()
);

export const setEntries = createAction(
  '[BudgetPlan] set entries',
  props<{ budgetPlanId: number; entries: BudgetPlanEntry[] }>()
);

export const fetchEntries = createAction(
  '[BudgetPlan] fetch entries',
  props<{ cashBoxId: number; budgetPlanId: number }>()
);

export const createEntry = createAction(
  '[BudgetPlan] create entry',
  props<{ cashBoxId: number; budgetPlanId: number; entry: BudgetPlanEntry }>()
);

export const updateEntry = createAction(
  '[BudgetPlan] update entry',
  props<{
    cashBoxId: number;
    budgetPlanId: number;
    index: number;
    entry: BudgetPlanEntry;
  }>()
);

export const deleteEntry = createAction(
  '[BudgetPlan] delete entry',
  props<{
    cashBoxId: number;
    budgetPlanId: number;
    index: number;
  }>()
);

export const fetchReport = createAction(
  '[BudgetPlan] fetch report',
  props<{ cashBoxId: number; budgetPlanId: number }>()
);

export const setReport = createAction(
  '[BudgetPlan] set report',
  props<{ budgetPlanId: number; report: BudgetPlanReport }>()
);

export const addBudgetPlan = createAction(
  '[BudgetPlan] add',
  props<{ cashBoxId: number; budgetPlan: BudgetPlan }>()
);

export const updateBudgetPlan = createAction(
  '[BudgetPlan] update',
  props<{ cashBoxId: number; index: number; budgetPlan: BudgetPlan }>()
);

export const deleteBudgetPlan = createAction(
  '[BudgetPlan] delete',
  props<{ cashBoxId: number; index: number }>()
);

export const updateBudgetPlanFail = createAction(
  '[BudgetPlan] add|update fail',
  props<{ cashBoxId: number; error: string }>()
);

export const updateBudgetPlanSuccess = createAction(
  '[BudgetPlan] add|update success',
  props<{ cashBoxId: number; budgetPlan: BudgetPlan }>()
);
