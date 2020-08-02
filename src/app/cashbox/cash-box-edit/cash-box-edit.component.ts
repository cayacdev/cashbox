import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import * as CashBoxActions from '../store/cash-box.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cash-box-edit',
  templateUrl: './cash-box-edit.component.html',
  styleUrls: ['./cash-box-edit.component.scss'],
})
export class CashBoxEditComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  error: string;
  editMode: false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      description: new FormControl(null, [Validators.maxLength(255)]),
    });
    this.store.select('cashBoxes').subscribe((state) => {
      this.loading = state.loading;
      this.error = state.error;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.store.dispatch(
        CashBoxActions.addCashBox({ cashBox: this.form.value })
      );
    }
  }
}
