import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import * as fromApp from '../../../store/app.reducer';
import * as CashBoxActions from '../../store/cash-boxes/cash-box.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CashBox } from '../../../model/cash-box.model';
import { ErrorState, LoadingState } from '../../../store/state';

@Component({
  selector: 'app-cash-box-edit',
  templateUrl: './cash-box-edit.component.html',
  styleUrls: ['./cash-box-edit.component.scss'],
})
export class CashBoxEditComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  isLoading: boolean;
  error: string;
  editMode = false;
  private cashBox: CashBox;
  private sub: Subscription;

  constructor(private store: Store<fromApp.AppState>, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.cashBox = this.activatedRoute.snapshot.data.cashBox;
    this.sub = this.store.select('cashBoxes').subscribe((state) => {
      this.isLoading = state.loadCashBoxState === LoadingState.LOADING;
      this.error = (state.loadCashBoxState as ErrorState).errorMsg;
    });
    if (this.cashBox) {
      this.editMode = true;
    }
    this.initForm();
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    if (!this.editMode) {
      this.store.dispatch(CashBoxActions.addCashBox({ cashBox: this.form.value }));
    } else {
      this.store.dispatch(
        CashBoxActions.updateCashBox({
          cashBox: { ...this.form.value, id: this.cashBox.id },
        })
      );
    }
  }

  private initForm(): void {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(this.cashBox?.name, [Validators.required, Validators.maxLength(255)]),
      description: new UntypedFormControl(this.cashBox?.description, [Validators.maxLength(255)]),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
