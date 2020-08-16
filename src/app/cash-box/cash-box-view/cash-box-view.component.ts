import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CashBox } from '../cash-box.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cash-box-view',
  templateUrl: './cash-box-view.component.html',
  styleUrls: ['./cash-box-view.component.scss'],
})
export class CashBoxViewComponent implements OnInit, OnDestroy {
  cashBox: CashBox;
  isLoading: boolean;
  private sub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.sub = this.store.select('cashBoxes').subscribe((state) => {
      this.cashBox = state.selectedCashBox;
      this.isLoading = state.loading;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
