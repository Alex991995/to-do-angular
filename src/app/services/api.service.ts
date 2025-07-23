import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITaskCreate, ITask } from 'app/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient)
  baseURL = 'https://jsonplaceholder.typicode.com'

  getAllToDo() {
    return this.http.get<ITask[]>(`${this.baseURL}/todos`)
  }

  addTask(task:ITaskCreate){
   return this.http.post(`${this.baseURL}/todos`, task)
  }
}
