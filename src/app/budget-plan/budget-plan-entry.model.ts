export class BudgetPlanEntry {
  constructor(
    public id: number,
    public date: Date,
    public description: string,
    public userName: string,
    public value: number
  ) {}
}
