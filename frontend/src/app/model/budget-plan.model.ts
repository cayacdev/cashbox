import { BudgetPlanEntry } from './budget-plan-entry.model'

export class BudgetPlan {
  constructor(
    public id: number,
    public name: string,
    public start_date: string,
    public end_date: string,
    public budget: number,
    public entries: BudgetPlanEntry[],
    public closed: boolean,
  ) {}
}

export class BudgetPlanReport {
  constructor(
    public remainingBudget: number,
    public paidOverall: number,
    public paidByUser: { name: string; value: number }[],
    public debtsByUser: { debtor: string; creditor: string; value: number }[],
  ) {}
}
