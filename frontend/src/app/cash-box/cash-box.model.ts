import { BudgetPlan } from '../budget-plan/budget-plan.model';

export class CashBox {
  constructor(
    public id: number,
    public name: string,
    public description?: string,
    public activeBudgetPlan?: BudgetPlan
  ) {}
}
