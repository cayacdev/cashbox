import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BudgetPlanEntry } from '../budget-plan-entry.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as BudgetPlanActions from '../store/budget-plan.actions';
import * as CashBoxActions from '../../cash-box/store/cash-box.actions';
import { Observable } from 'rxjs';
import { PredefinedDescription } from '../../cash-box/cash-box.model';
import { filter, map, startWith, switchMap } from 'rxjs/operators';

export interface BudgetPlanEntryDialogData {
  data: BudgetPlanEntry;
  budgetPlanId: number;
  cashBoxId: number;
}

@Component({
  selector: 'app-budget-plan-entry-dialog',
  templateUrl: './budget-plan-entry-dialog.component.html',
  styleUrls: ['./budget-plan-entry-dialog.component.scss'],
})
export class BudgetPlanEntryDialogComponent implements OnInit {
  form: FormGroup;
  element: BudgetPlanEntry;
  private descriptions$: Observable<PredefinedDescription[]>;
  filteredDescriptions$: Observable<PredefinedDescription[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BudgetPlanEntryDialogData,
    private readonly store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.element = this.data.data;
    this.initForm();

    this.descriptions$ = this.store.select('cashBoxes').pipe(
      map((state) => {
        const cashBox = state.cashBoxes.find(
          (c) => c.id === this.data.cashBoxId
        );
        return cashBox?.settings?.descriptions;
      })
    );

    this.store.dispatch(
      CashBoxActions.fetchCashBoxSettings({
        cashBoxId: this.data.cashBoxId,
      })
    );

    this.filteredDescriptions$ = this.form.get('description').valueChanges.pipe(
      startWith(''),
      filter((value) => typeof value === 'string'),
      switchMap((value) => this._filter(value))
    );
  }

  private initForm(): void {
    this.form = new FormGroup({
      description: new FormControl(this.data?.data?.description, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      value: new FormControl(this.data?.data?.value, [Validators.required]),
      date: new FormControl(this.data.data?.date ?? new Date(), [
        Validators.required,
      ]),
    });
  }

  onSubmit(): void {
    const body = {
      budgetPlanId: this.data.budgetPlanId,
      cashBoxId: this.data.cashBoxId,
      entry: {
        ...this.form.value,
        date: this.fixDate(this.form.value.date),
      },
    };

    if (this.element) {
      this.store.dispatch(
        BudgetPlanActions.updateEntry({
          ...body,
          index: this.element.id,
        })
      );
    } else {
      this.store.dispatch(BudgetPlanActions.createEntry(body));
    }
  }

  displayFn(description: PredefinedDescription): string {
    return description?.value;
  }

  private _filter(value: string): Observable<PredefinedDescription[]> {
    return this.descriptions$.pipe(
      map((list) => {
        return list?.filter((option) => {
          return option.value.toLowerCase().includes(value.toLowerCase());
        });
      })
    );
  }

  private fixDate(date: string): string {
    const d = new Date(date);
    d.setMinutes(-1 * d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  }
}
