import { Component, DestroyRef, inject, OnDestroy } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '@components/modal/modal.component';
import { ITask } from '@interface/index';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-to-do',
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './list-to-do.component.html',
  styleUrl: './list-to-do.component.css',
})
export class ListToDOComponent {
  private dialog = inject(MatDialog);
  private apiService = inject(ApiService);
  protected arrayTasks: ITask[] = [];
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.fetchTasks();
  }

  openModal(id: string) {
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: id,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.fetchTasks();
      });
  }

  changeStatus(task: ITask) {
    this.apiService
      .changeCompletion(task)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.fetchTasks();
      });
  }

  fetchTasks() {
    this.apiService
      .getAllToDo()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.arrayTasks = res;
      });
  }
}
