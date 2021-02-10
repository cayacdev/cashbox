export class BudgetPlanEntry {
  constructor(
    public id: number,
    public date: Date,
    public description: string,
    public user: { name: string },
    public value: number
  ) {}
}
