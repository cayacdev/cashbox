import { BudgetPlanEntry } from './budget-plan-entry.model';

export class BudgetPlan {
  constructor(
    public id: number,
    public name: string,
    // following variable names dont match rule 'lowerCamelCase'.
    // This is necessary because these models will be used to map the responses from the rest interfaces.
    // tslint:disable:variable-name
    public start_date: Date,
    public end_date: Date,
    // tslint:enable
    public budget: number,
    public entries: BudgetPlanEntry[],
    public report: BudgetPlanReport
  ) {}
}

export class BudgetPlanReport {
  constructor(
    public remainingBudget: number,
    public paidOverall: number,
    public paidByUser: { name: string; value: number }[],
    public debtsByUser: { debtor: string; creditor: string; value: number }[]
  ) {}
}
