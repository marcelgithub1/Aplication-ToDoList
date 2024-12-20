import { Routes } from '@angular/router';
import { TarefaComponent } from './Components/tarefa/tarefa.component';

export const routes: Routes = [
    {
        path: "", component:TarefaComponent
    },
    {
        path:"tarefa", component: TarefaComponent
    }
];
