import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '@components/modal/modal.component';
import { ITask } from '@interface/index';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputComponent } from '@components/input/input.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-list-to-do',
  imports: [MatIconModule, MatDialogModule, InputComponent],
  templateUrl: './list-to-do.component.html',
  styleUrl: './list-to-do.component.css',
})
export class ListToDOComponent {
  private dialog = inject(MatDialog);
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);

  protected arrayTasks: ITask[] = [];
  private outputValue = signal<string | undefined>(undefined);

  constructor() {
    this.fetchTasks();
  }

  protected handleData(title: string) {
    this.outputValue.set(title);
    this.fetchTasks();
  }

  protected openModal(id: string) {
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '450px',
      data: id,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.fetchTasks();
      });
  }

  protected changeStatus(task: ITask) {
    this.apiService
      .changeCompletion(task)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.fetchTasks();
      });
  }

  private fetchTasks() {
    this.apiService
      .getAllToDo()
      .pipe(
        map((array) => this.filterArrayTasksIfValueExist(array)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => {
        this.arrayTasks = res;
      });
  }

  private filterArrayTasksIfValueExist(arrayTasks: ITask[]) {
    const value = this.outputValue();
    if (value) {
      return arrayTasks.filter((item) => item.todo.startsWith(value));
    } else {
      return arrayTasks;
    }
  }
}
