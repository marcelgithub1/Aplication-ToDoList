É necessario que tenha instalado em seu computador o Entity-Framework e .Net 8 Core SDK.

Verifique a connection String que está no arquivo :appsettings.json.
Rodar o comando no PowerShell para migration no banco de dados: "Add Migration 'Initial Setup'"
Após finalizar rodar o comando: update-database. 
Compilar e rodar o back-End.

Para rodar o Front-End, certifique-se de estar com o npm e node atualizados.
Na pasta "ToDoList-app" do projeto, rodar o comando no terminal: ng server -o.