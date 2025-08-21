import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-to-do',
  imports: [ReactiveFormsModule, NgbDropdownModule],
  templateUrl: './create-to-do.component.html',
  styleUrl: './create-to-do.component.css',
})
export class CreateTodoComponent {
  private apiService = inject(ApiService);
  protected form = new FormGroup({
    title: new FormControl('', Validators.required),
  });
  private destroyRef = inject(DestroyRef);

  constructor(private router: Router) {}

  onSubmit() {
    const todo = this.form.value.title;
    if (todo) {
      this.apiService
        .addTask({ todo, completed: false })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.router.navigate(['/']);
        });
    }
  }
}
