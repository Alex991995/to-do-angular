import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-to-do',
  imports: [ReactiveFormsModule],
  templateUrl: './create-to-do.component.html',
  styleUrl: './create-to-do.component.css'
})
export class CreateTodoComponent {
  apiService = inject(ApiService)
  form = new FormGroup({
    title: new FormControl('', Validators.required),
  })

  constructor(private router: Router) { }

  onSubmit() {
    const todo = this.form.value.title
    if (todo) {
      this.apiService.addTask({ todo, completed: false })
        .subscribe((res) => {
          this.router.navigate(['/'])
        })
    }

  }
}
