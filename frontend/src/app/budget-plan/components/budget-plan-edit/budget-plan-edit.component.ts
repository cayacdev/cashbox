import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetPlan } from '../../../model/budget-plan.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import * as BudgetPlanAction from '../../store/budget-plan.actions';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-budget-plan-edit',
  templateUrl: './budget-plan-edit.component.html',
  styleUrls: ['./budget-plan-edit.component.scss'],
})
export class BudgetPlanEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading: boolean;
  error: string;
  editMode = false;
  budgetPlan: BudgetPlan;
  cashBoxId: number;
  private sub: Subscription;

  constructor(private store: Store<fromApp.AppState>, private activatedRoute: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(): void {
    this.budgetPlan = this.activatedRoute.snapshot.data.budgetPlan;
    this.editMode = !!this.budgetPlan;
    this.activatedRoute.parent.data.pipe(take(1)).subscribe((data) => {
      this.cashBoxId = data.cashBoxId;
    });
    this.sub = this.store.select('budgetPlan').subscribe((state) => {
      this.loading = state.loading;
      this.error = state.error;
    });
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.budgetPlan?.name, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      budget: new FormControl(this.budgetPlan?.budget, [Validators.required]),
      range: new FormGroup({
        start_date: new FormControl(this.budgetPlan?.start_date, [
          Validators.required,
        ]),
        end_date: new FormControl(this.budgetPlan?.end_date, [
          Validators.required,
        ]),
      }),
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    if (!this.editMode) {
      this.store.dispatch(
        BudgetPlanAction.addBudgetPlan({
          cashBoxId: this.cashBoxId,
          budgetPlan: {
            ...this.form.value,
            start_date: this.fixDate(this.form.value.range.start_date),
            end_date: this.fixDate(this.form.value.range.end_date),
          },
        })
      );
    } else {
      this.store.dispatch(
        BudgetPlanAction.updateBudgetPlan({
          cashBoxId: this.cashBoxId,
          budgetPlan: {
            ...this.form.value,
            start_date: this.fixDate(this.form.value.range.start_date),
            end_date: this.fixDate(this.form.value.range.end_date),
          },
          index: this.budgetPlan.id,
        })
      );
    }

    this.router.navigate([`/cash-boxes/${this.cashBoxId}`]);
  }

  private fixDate(date: string): string {
    const d = new Date(date);
    d.setMinutes(-1 * d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
