import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-cash-box-plans',
  template: '<app-cash-box-budget-plan-list [cashBoxId]="(cashBoxId$ | async)"></app-cash-box-budget-plan-list>',
})
export class CashBoxPlansComponent implements OnInit {
  cashBoxId$: Observable<number>

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.cashBoxId$ = this.activatedRoute.parent?.data.pipe(map((data) => data.cashBox.id)) as Observable<number>
  }
}
