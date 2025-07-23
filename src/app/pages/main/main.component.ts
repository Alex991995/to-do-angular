import { SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ApiService } from '@services/api.service';
import { ITask } from 'app/interface';

@Component({
  selector: 'app-main',
  imports: [SlicePipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  apiService = inject(ApiService)
  arrayTasks: ITask[] = []

  constructor() {
    this.apiService.getAllToDo()
      .subscribe(res => {
        this.arrayTasks = res
      })
  }
}
