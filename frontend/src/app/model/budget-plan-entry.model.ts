import { User } from './user.model';

export class BudgetPlanEntry {
  constructor(
    public id: number, //
    public date: Date,
    public description: string,
    public user: User,
    public value: number
  ) {}
}
