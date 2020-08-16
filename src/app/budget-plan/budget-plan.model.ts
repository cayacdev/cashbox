import { BudgetPlanEntry } from './budget-plan-entry.model';

export class BudgetPlan {
  constructor(
    public id: number,
    public name: string,
    public start_date: Date,
    public end_date: Date,
    public budget: number,
    public entries: BudgetPlanEntry[]
  ) {}
}
