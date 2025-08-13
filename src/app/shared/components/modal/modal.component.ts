import { Component, DestroyRef, inject, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { ApiService } from '@core/services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-modal',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  private id: string;
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);
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
      takeUntilDestroyed(this.destroyRef);
    });
  }
}
