import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import * as fromApp from '../../../store/app.reducer'
import { map, take } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import { CashBoxSettings, PredefinedDescription } from '../../../model/cash-box.model'
import { combineLatest, Observable } from 'rxjs'
import { MatChipInputEvent } from '@angular/material/chips'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { LoadingState } from '../../../store/state'
import {
  addCashBoxDescription,
  loadCashBoxSettings,
  removeCashBoxDescription,
} from '../../store/cash-box-settings/cash-box-settings.actions'
import { selectCashBoxSettings } from '../../store/cash-box-settings/cash-box-settings.selectors'

@Component({
  selector: 'app-cash-box-settings',
  templateUrl: './cash-box-settings.component.html',
  styleUrls: ['./cash-box-settings.component.scss'],
})
export class CashBoxSettingsComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]

  settings$: Observable<CashBoxSettings>
  isLoading$: Observable<boolean>

  private cashBoxId$: Observable<number>

  constructor(
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.cashBoxId$ = this.activatedRoute.parent?.data.pipe(map((data) => data.cashBox.id)) as Observable<number>

    this.settings$ = combineLatest([this.cashBoxId$, this.store.select(selectCashBoxSettings)]).pipe(
      map(([id, state]) => state.settings[id]),
    )

    this.isLoading$ = this.store.select(selectCashBoxSettings).pipe(map((state) => state.loadCashBoxSettingState === LoadingState.LOADING))

    this.cashBoxId$.pipe(take(1)).subscribe((cashBoxId) => {
      this.store.dispatch(loadCashBoxSettings({ cashBoxId }))
    })
  }

  remove(description: PredefinedDescription): void {
    this.cashBoxId$.pipe(take(1)).subscribe((id) => {
      this.store.dispatch(
        removeCashBoxDescription({
          cashBoxId: id,
          descriptionId: description.id,
        }),
      )
    })
  }

  add($event: MatChipInputEvent): void {
    const input = $event.input

    if (!input.value) {
      return
    }

    this.cashBoxId$.pipe(take(1)).subscribe((id) => {
      this.store.dispatch(
        addCashBoxDescription({
          cashBoxId: id,
          value: input.value.trim(),
        }),
      )

      if (input) {
        input.value = ''
      }
    })
  }
}
