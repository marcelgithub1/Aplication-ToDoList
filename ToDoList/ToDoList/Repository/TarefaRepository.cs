using Microsoft.EntityFrameworkCore;
using ToDoList.Data;
using ToDoList.Models;

namespace ToDoList.Repository
{
    public class TarefaRepository
    {
        private readonly AppDbContext db;

        public TarefaRepository (AppDbContext dbContext)
        {
            this.db = dbContext;
        }

        public async Task<List<Tarefa>> GetAllTasks()
        {
            return await db.Tarefas.ToListAsync();
        }
        public async Task SaveTask(Tarefa task)
        {
            await db.Tarefas.AddAsync(task);
            await db.SaveChangesAsync();
        }

        public async Task updateTask(int id, Tarefa task)
        {
            var tarefa = await db.Tarefas.FindAsync(id);
            if(tarefa ==null)
            {
                throw new Exception("Tarefa não Encontrada");
            }
            tarefa.Title = task.Title;
            tarefa.Description = task.Description;
            tarefa.Status = task.Status;

            await db.SaveChangesAsync();
        }

        public async Task DeleteTask(int id)
        {
            var tarefa = await db.Tarefas.FindAsync(id);
            if(tarefa == null)
            {
                throw new Exception("Tarefa não Encontrada");
            }
            db.Tarefas.Remove(tarefa);
            await db.SaveChangesAsync();
        }
    }
}
