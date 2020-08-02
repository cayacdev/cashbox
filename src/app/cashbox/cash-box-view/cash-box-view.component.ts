import { Component, OnInit } from '@angular/core';
import { CashBox } from '../cash-box.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cash-box-view',
  templateUrl: './cash-box-view.component.html',
  styleUrls: ['./cash-box-view.component.scss'],
})
export class CashBoxViewComponent implements OnInit {
  cashBox: CashBox;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.cashBox = this.activatedRoute.snapshot.data.cashBox;
  }
}
