using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using ToDoList.Models;
using ToDoList.Repository;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefaController : ControllerBase
    {
        private readonly TarefaRepository task;
        public TarefaController(TarefaRepository tarefaRepository) 
        {
            this.task = tarefaRepository;
        }

        [HttpGet]
        public async Task<ActionResult> TarefaList()
        {
            var allTasks = await task.GetAllTasks();
            return Ok(allTasks);
        }

        [HttpPost]
        public async Task<ActionResult> AddTarefa(Tarefa tarefa) 
        {
            await this.task.SaveTask(tarefa);
            return Ok(tarefa);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> updateTask(int id, [FromBody] Tarefa tarefa)
        {
            await this.task.updateTask(id, tarefa);
            return Ok(tarefa);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            await this.task.DeleteTask(id);
            return Ok();
        }
    }
}
