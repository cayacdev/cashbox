export class CashBox {
  constructor(
    public id: number, //
    public name?: string,
    public description?: string,
    public activeBudgetPlanId?: number
  ) {}
}

export interface CashBoxSettings {
  descriptions?: PredefinedDescription[];
}

export interface PredefinedDescription {
  id: number;
  value: string;
}
