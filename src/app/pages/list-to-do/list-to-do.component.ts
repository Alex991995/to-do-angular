import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '@components/modal/modal.component';
import { ITask } from '@interface/index';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { InputComponent } from '@components/input/input.component';
import { FilterPipe } from 'app/shared/pipes/filter.pipe';
import {
  BehaviorSubject,
  catchError,
  debounce,
  debounceTime,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-list-to-do',
  imports: [MatIconModule, MatDialogModule, InputComponent, MatCheckboxModule],
  templateUrl: './list-to-do.component.html',
  styleUrl: './list-to-do.component.css',
})
export class ListToDOComponent {
  private dialog = inject(MatDialog);
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);

  protected arrayTasks = signal<ITask[]>([]);
  protected inputSignal = signal<string>('');
  valueInput$ = toObservable(this.inputSignal);

  constructor() {
    this.valueInput$
      .pipe(
        debounce((v) => (v ? timer(500) : of(null))),
        switchMap((v) => this.fetchTasks(v)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res) => this.arrayTasks.set(res),
        error: (err) => console.log(err),
      });
  }

  protected handleData(title: string) {
    this.inputSignal.set(title);
  }

  protected openModal(id: string) {
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '450px',
      data: id,
    });

    dialogRef.afterClosed().subscribe();
  }

  protected changeStatus(task: ITask) {
    this.apiService
      .changeCompletion(task)
      .pipe(
        switchMap(() => this.fetchTasks(this.inputSignal())),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => this.arrayTasks.set(res));
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.statusText));
  }

  private fetchTasks(v: string) {
    return this.apiService.getAllToDo(v).pipe(catchError(this.handleError));
  }
}
