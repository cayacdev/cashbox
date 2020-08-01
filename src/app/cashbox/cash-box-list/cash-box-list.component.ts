import { Component, OnInit, ViewChild } from '@angular/core';
import { CashBox } from '../cash-box.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA: CashBox[] = [
  {
    id: 1,
    name: 'Test',
    description: 'Lorem Ipsum',
  },
  {
    id: 2,
    name: 'Test',
    description: 'Lorem Ipsum',
  },
  {
    id: 3,
    name: 'Test',
    description: 'Lorem Ipsum',
  },
  {
    id: 4,
    name: 'Test',
    description: 'Lorem Ipsum',
  },
  {
    id: 5,
    name: 'Test',
    description: 'Lorem Ipsum',
  },
  {
    id: 6,
    name: 'Test',
    description: 'Lorem Ipsum',
  },
];

@Component({
  selector: 'app-cash-box-list',
  templateUrl: './cash-box-list.component.html',
  styleUrls: ['./cash-box-list.component.scss'],
})
export class CashBoxListComponent implements OnInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['name', 'description', 'actions'];

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  onView(element: CashBox): void {
    console.log(element);
  }

  onEdit(element: CashBox): void {
    console.log(element);
  }

  onDelete(element: CashBox): void {
    console.log(element);
  }
}
