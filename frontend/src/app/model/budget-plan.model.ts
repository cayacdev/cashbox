import { BudgetPlanEntry } from './budget-plan-entry.model';

export class BudgetPlan {
  constructor(
    public id: number,
    public name: string,
    // following variable names dont match rule 'lowerCamelCase'.
    // This is necessary because these models will be used to map the responses from the rest interfaces.
    /* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
    public start_date: Date,
    public end_date: Date,
    /* eslint-enable */
    public budget: number,
    public entries: BudgetPlanEntry[],
    public closed: boolean
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
