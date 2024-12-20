import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Tarefa } from '../Models/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private apiUrl = 'https://localhost:44365/api/Tarefa'

  constructor() { }

  http = inject(HttpClient)

  getAllTasks(){
    return this.http.get<Tarefa[]>(this.apiUrl);
  }
  
  addTask(data: any)
  {
    return this.http.post(this.apiUrl, data);
  }

  updateTask(tarefa: Tarefa)
  {
    return this.http.put(`${this.apiUrl}/${tarefa.id}`, tarefa)
  }

  deleteTask(id: number)
  {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
