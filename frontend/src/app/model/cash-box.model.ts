import { BudgetPlan } from './budget-plan.model';

export class CashBox {
  constructor(
    public id: number,
    public name?: string,
    public description?: string,
    public activeBudgetPlanId?: number,
    // TODO: deprecated
    public activeBudgetPlan?: BudgetPlan,
    public settings?: CashBoxSettings
  ) {}
}

export interface CashBoxSettings {
  descriptions?: PredefinedDescription[];
}

export interface PredefinedDescription {
  id: number;
  value: string;
}
