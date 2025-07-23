import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient)
  baseURL = 'https://jsonplaceholder.typicode.com'

  getAllToDo(){
  return  this.http.get(`${this.baseURL}/todos`)
  }
}
