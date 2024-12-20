import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tarefa } from '../../Models/tarefa';
import { TarefaService } from '../../Services/tarefa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarefa',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.css'
})
export class TarefaComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;

  tarefaList : Tarefa[] = [];
  tarefaService = inject(TarefaService);
  
  tarefaForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder){}

  ngOnInit(): void{
   this.setFormState();
   this.getTarefas();
  }

  openModal(){
    const taskModal = document.getElementById('myModal');
    if(taskModal != null){
      taskModal.style.display = 'block';
    }
  }

  closeModal(){
    this.setFormState();
    if(this.model != null) {
      this.model.nativeElement.style.display= 'none';
    } 
  }

  getTarefas()
  {
    this.tarefaService.getAllTasks().subscribe((res) =>{
      this.tarefaList = res;
    })
  }

  setFormState(){
    this.tarefaForm = this.fb.group({
      id:[0],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: [false , [Validators.required]]
    });
  }

  formValues:any;
  onSubmit(){
    console.log(this.tarefaForm.value);
    if(this.tarefaForm.invalid){
      alert('Favor, preencha todos os campos.');
      return;
    }
    if(this.tarefaForm.value.id== 0){
      this.formValues = this.tarefaForm.value
    this.tarefaService.addTask(this.formValues).subscribe((res) => {
      alert('Tarefa adicionada com sucesso.');
      this.getTarefas();
      this.tarefaForm.reset();
      this.closeModal();
    });
    }else{
      this.formValues = this.tarefaForm.value
      this.tarefaService.updateTask(this.formValues).subscribe((res) => {
      alert('Tarefa atualizada com sucesso.');
      this.getTarefas();
      this.tarefaForm.reset();
      this.closeModal();
    });
    }
    
  }
  
  onEdit(Tarefa: Tarefa){
    this.openModal();
    this.tarefaForm.patchValue(Tarefa);
  }

  onDelete(tarefa: Tarefa)
  {
    const isConfirm = confirm("Você tem certeza que deseja excluir a tarefa: "+ tarefa.title + " ?");
    if(isConfirm)
    {
      this.tarefaService.deleteTask(tarefa.id).subscribe((res) =>{
        alert("Tarefa excluída com sucesso!");
        this.getTarefas();
      });
    }    
  }

}
