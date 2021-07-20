import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddButtonComponent } from './add-button/add-button.component';

const modules = [CommonModule, MaterialModule, ReactiveFormsModule];

@NgModule({
  declarations: [DeleteDialogComponent, AddButtonComponent],
  imports: modules,
  exports: [...modules, DeleteDialogComponent, AddButtonComponent],
})
export class SharedModule {}
