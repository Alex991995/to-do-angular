
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
        console.log(res)
        this.arrayTasks = res
      })
  }


  updateSelection(event: MatSelectionListChange) {
    event.source.selectedOptions.selected.map(o => {
      console.log(o.value)
    });

  }


}
