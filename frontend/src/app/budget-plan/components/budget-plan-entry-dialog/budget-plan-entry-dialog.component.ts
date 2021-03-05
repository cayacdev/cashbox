import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BudgetPlanEntry } from '../../../model/budget-plan-entry.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as BudgetPlanActions from '../../store/budget-plan.actions';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { PredefinedDescription } from '../../../model/cash-box.model';
import { delay, filter, map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { loadCashBoxSettings } from '../../../cash-box/store/cash-box-settings/cash-box-settings.actions';
import { selectCashBoxSettings } from '../../../cash-box/store/cash-box-settings/cash-box-settings.selectors';
import { MatCheckbox } from '@angular/material/checkbox';

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
  @ViewChild('createAnotherCheckbox') createAnotherCheckbox: MatCheckbox;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BudgetPlanEntryDialogData,
    private readonly store: Store<fromApp.AppState>,
    private readonly matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.element = this.data.data;
    this.initForm();

    this.descriptions$ = this.store.select(selectCashBoxSettings).pipe(map((state) => state.settings[this.data.cashBoxId]?.descriptions));

    this.store.dispatch(
      loadCashBoxSettings({
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
      description: new FormControl(this.data?.data?.description, [Validators.required, Validators.maxLength(255)]),
      value: new FormControl(this.data?.data?.value, [Validators.required]),
      date: new FormControl(this.data.data?.date ?? new Date(), [Validators.required]),
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
        BudgetPlanActions.updateBudgetPlanEntry({
          ...body,
          budgetPlanEntryId: this.element.id,
        })
      );
    } else {
      this.store.dispatch(BudgetPlanActions.addBudgetPlanEntry(body));
    }

    this.reopenDialogWhenRequested();
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

  private reopenDialogWhenRequested(): void {
    if (this.createAnotherCheckbox?.checked) {
      this.matDialog.open(BudgetPlanEntryDialogComponent, {
        data: {
          data: null,
          budgetPlanId: this.data.budgetPlanId,
          cashBoxId: this.data.cashBoxId,
        } as BudgetPlanEntryDialogData,
      });
    }
  }

  ngAfterViewInit(): void {
    combineLatest([this.autocomplete.opened, fromEvent(window, 'resize')])
      .pipe(delay(100))
      .subscribe(() => {
        const panel: HTMLElement = document.getElementsByClassName('pre-defined-descriptions-panel')[0] as HTMLElement;

        const boundingRect: DOMRect = panel.getBoundingClientRect();
        if (boundingRect.top < 0) {
          panel.style.maxHeight = `${boundingRect.height + boundingRect.top}px`;
        } else if (boundingRect.bottom > window.innerHeight) {
          panel.style.maxHeight = `${window.innerHeight - boundingRect.top}px`;
        }
      });
  }
}
