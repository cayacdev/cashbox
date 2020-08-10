import { createAction, props } from '@ngrx/store';
import { BudgetPlan } from '../budget-plan.model';

export const setBudgetPlans = createAction(
  '[BudgetPlan] set',
  props<{ budgetPlans: BudgetPlan[] }>()
);

export const fetchBudgetPlans = createAction(
  '[BudgetPlan] fetch',
  props<{ cashBoxId: number }>()
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
