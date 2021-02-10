import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BudgetPlanEntry } from '../budget-plan-entry.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as BudgetPlanActions from '../store/budget-plan.actions';
import * as CashBoxActions from '../../cash-box/store/cash-box.actions';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { PredefinedDescription } from '../../model/cash-box.model';
import { delay, filter, map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';

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
export class BudgetPlanEntryDialogComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  element: BudgetPlanEntry;
  private descriptions$: Observable<PredefinedDescription[]>;
  filteredDescriptions$: Observable<PredefinedDescription[]>;
  @ViewChild('auto') autocomplete: MatAutocomplete;

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

  ngAfterViewInit(): void {
    combineLatest([this.autocomplete.opened, fromEvent(window, 'resize')])
      .pipe(delay(100))
      .subscribe(() => {
        const panel: HTMLElement = document.getElementsByClassName(
          'pre-defined-descriptions-panel'
        )[0] as HTMLElement;

        const boundingRect: DOMRect = panel.getBoundingClientRect();
        if (boundingRect.top < 0) {
          panel.style.maxHeight = `${boundingRect.height + boundingRect.top}px`;
        } else if (boundingRect.bottom > window.innerHeight) {
          panel.style.maxHeight = `${window.innerHeight - boundingRect.top}px`;
        }
      });
  }
}
