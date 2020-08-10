import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CashBox } from '../cash-box.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as CashBoxActions from '../store/cash-box.actions';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-cash-box-list',
  templateUrl: './cash-box-list.component.html',
  styleUrls: ['./cash-box-list.component.scss'],
})
export class CashBoxListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource();
  isLoading: boolean;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['name', 'description', 'actions'];
  private sub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.store.select('cashBoxes').subscribe((state) => {
      this.dataSource.data = state.cashBoxes;
      this.isLoading = state.loading;
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
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { data: element, headline: element.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === element) {
        this.store.dispatch(
          CashBoxActions.deleteCashBox({ index: element.id })
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
