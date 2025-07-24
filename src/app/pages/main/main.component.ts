
import { Component, inject, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { ITask } from 'app/interface';
import { MatListModule, MatSelectionList, MatSelectionListChange } from '@angular/material/list';


@Component({
  selector: 'app-main',
  imports: [MatListModule,],
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


  async changeStatus(task:ITask){
    this.apiService.changeCompletion(task).subscribe()
  }
}
