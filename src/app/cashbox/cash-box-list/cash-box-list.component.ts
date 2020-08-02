import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CashBox } from '../cash-box.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as CashBoxActions from '../store/cash-box.actions';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cash-box-list',
  templateUrl: './cash-box-list.component.html',
  styleUrls: ['./cash-box-list.component.scss'],
})
export class CashBoxListComponent implements OnInit {
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['name', 'description', 'actions'];

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.select('cashBoxes').subscribe((state) => {
      this.dataSource.data = state.cashBoxes;
    });

    this.dataSource.sort = this.sort;
    this.store.dispatch(CashBoxActions.fetchCashBoxes());
  }

  onView(element: CashBox): void {
    this.router.navigate([element.id], { relativeTo: this.activatedRoute });
  }

  onEdit(element: CashBox): void {
    this.router.navigate([element.id, 'edit'], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(element: CashBox): void {
    {
      const dialogRef = this.dialog.open(CashBoxDeleteDialogComponent, {
        width: '250px',
        data: { cashBox: element },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === element) {
          this.store.dispatch(
            CashBoxActions.deleteCashBox({ index: element.id })
          );
        }
      });
    }
  }
}

interface CashBoxDeleteDialogData {
  cashBox: CashBox;
}

@Component({
  selector: 'app-cash-box-delete-dialog',
  templateUrl: './cash-box-delete.dialog.html',
})
export class CashBoxDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CashBoxDeleteDialogData) {}
}
