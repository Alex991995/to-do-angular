import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITask, ITaskCreate } from '@interface/index';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseURL = 'http://localhost:3000/todos';

  getAllToDo(value: string) {
    return this.http.get<ITask[]>(`${this.baseURL}?todo_like=${value}`);
  }

  changeCompletion(task: ITask) {
    return this.http.put(`${this.baseURL}/${task.id}`, {
      ...task,
      completed: !task.completed,
    });
  }

  addTask(task: ITaskCreate) {
    return this.http.post(`${this.baseURL}`, task);
  }

  getTaskByID(id: string) {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
