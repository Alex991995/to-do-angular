import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '@components/modal/modal.component';
import { ITask } from '@interface/index';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { InputComponent } from '@components/input/input.component';
import { FilterPipe } from 'app/shared/pipes/filter.pipe';
import { BehaviorSubject, debounceTime, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-list-to-do',
  imports: [MatIconModule, MatDialogModule, InputComponent, FilterPipe],
  templateUrl: './list-to-do.component.html',
  styleUrl: './list-to-do.component.css',
})
export class ListToDOComponent {
  private dialog = inject(MatDialog);
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);

  protected arrayTasks: ITask[] = [];
  protected inputSignal = signal<string>('');
  valueInput$ = toObservable(this.inputSignal);

  constructor() {
    this.fetchTasks();
  }

  protected handleData(title: string) {
    this.inputSignal.set(title);
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
    this.valueInput$
      .pipe(
        debounceTime(500),
        switchMap((v) =>
          this.apiService
            .getAllToDo(v)
            .pipe(takeUntilDestroyed(this.destroyRef))
        )
      )
      .subscribe((res) => {
        this.arrayTasks = res;
      });
  }
}
