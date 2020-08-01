import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cash-box-edit',
  templateUrl: './cash-box-edit.component.html',
  styleUrls: ['./cash-box-edit.component.scss'],
})
export class CashBoxEditComponent implements OnInit {
  cashBox: FormGroup;
  error: any;

  ngOnInit(): void {
    this.cashBox = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
    });
  }

  onSubmit(): void {}
}
