import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

const modules = [CommonModule, MaterialModule];

@NgModule({
  declarations: [DeleteDialogComponent],
  imports: modules,
  exports: [...modules, DeleteDialogComponent],
})
export class SharedModule {}
