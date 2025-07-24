import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITaskCreate, ITask } from 'app/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient)
  // baseURL = 'https://jsonplaceholder.typicode.com'
  baseURL = 'http://localhost:3000/todos'


  getAllToDo() {
    return this.http.get<ITask[]>(`${this.baseURL}`)
  }

  // getAllToDo() {
  //   return this.http.get<ITask[]>(`${this.baseURL}`)
  // }

  addTask(task:ITaskCreate){
   return this.http.post(`${this.baseURL}`, task)
  }
}
