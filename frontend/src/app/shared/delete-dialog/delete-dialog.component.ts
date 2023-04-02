import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DeleteDialogData {
  data: unknown;
  headline: string;
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete.dialog.html',
})
export class DeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) {}
}
