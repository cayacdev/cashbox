import { Component, OnInit, ViewChild } from '@angular/core';
import { CashBox } from '../cash-box.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA: CashBox[] = [
  {
    name: 'Test',
    description: 'Lorem Ipsum',
  },
  {
    name: 'Test',
    description: 'Lorem Ipsum',
  },
  {
    name: 'Test',
    description: 'Lorem Ipsum',
  },
  {
    name: 'Test',
    description: 'Lorem Ipsum',
  },
  {
    name: 'Test',
    description: 'Lorem Ipsum',
  },
  {
    name: 'Test',
    description: 'Lorem Ipsum',
  },
];

@Component({
  selector: 'app-cash-box-list',
  templateUrl: './cash-box-list.component.html',
})
export class CashBoxListComponent implements OnInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['name', 'description'];

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }
}
