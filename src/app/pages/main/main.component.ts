import { Component, inject } from '@angular/core';
import { ApiService } from '@services/api.service';
import { ITask } from 'app/interface';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalComponent } from '@common-ui/modal/modal.component';

@Component({
  selector: 'app-main',
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  dialog = inject(MatDialog);
  apiService = inject(ApiService);
  arrayTasks: ITask[] = [];

  constructor() {
    this.fetchTasks();
  }

  openModal(id: string) {
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchTasks();
    });
  }

  async changeStatus(task: ITask) {
    this.apiService.changeCompletion(task).subscribe(() => {
      this.fetchTasks();
    });
  }

  fetchTasks() {
    this.apiService.getAllToDo().subscribe((res) => {
      this.arrayTasks = res;
    });
  }
}
