import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CashBoxComponent } from './cash-box.component';
import { CashBoxListComponent } from './cash-box-list/cash-box-list.component';
import { CashBoxEditComponent } from './cash-box-edit/cash-box-edit.component';
import { CashBoxViewComponent } from './cash-box-view/cash-box-view.component';

const routes: Routes = [
  {
    path: 'cash-boxes',
    component: CashBoxComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CashBoxListComponent },
      { path: 'new', component: CashBoxEditComponent },
      { path: ':id', component: CashBoxViewComponent },
      { path: ':id/edit', component: CashBoxEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashBoxRoutingModule {}
