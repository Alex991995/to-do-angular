import { Component, inject, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-modal',
  imports: [MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  private id: string;
  private apiService = inject(ApiService);
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: string
  ) {
    this.id = data;
  }

  onCancel() {
    this.dialogRef.close();
  }

  deleteTask() {
    this.apiService.deleteTask(this.id).subscribe(() => {
      this.onCancel();
    });
  }
}
