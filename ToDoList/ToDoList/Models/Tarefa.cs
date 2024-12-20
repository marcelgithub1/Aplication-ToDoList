using System.ComponentModel.DataAnnotations;

namespace ToDoList.Models
{
    public class Tarefa
    {
        [Key]
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string? Description { get; set; }
        public bool Status { get; set; } // false - em andamento, true - concluída
    }
}
