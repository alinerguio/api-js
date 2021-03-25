const express = require("express");
const app = express();
const data = require("./data.json");

app.use(express.json());

app.get('/', function (req, res) {
	res.end('Bem vindo de Gerenciamento de Tarefas!');
})

// Get /tarefas: retornar uma lista com todas as tarefas.

app.get("/tarefas", function(req, res) {
  res.json(data);
});

// Get /tarefas/{identificador}: retornar a tarefa correspondente ao identificador.
app.get("/tarefas/:id", function(req, res) {
  const { id } = req.params;
  const tarefa = data.find(tar => tar.id == id);

  if (!tarefa) return res.status(204).json();

  res.json(tarefa);
});

// Post /tarefas: incluir uma tarefa; os dados da tarefa devem ser passados no corpo da requisição HTTP.
app.post('/tarefas', function (req, res) {
  var tarefa = req.body;
  data.push(tarefa)
  // data[data.length] = tarefa;
  res.json(data[data.length-1]);  
})

// Delete /tarefas/{identificador}: excluir a tarefa correspondente ao identificador.
app.delete("/tarefas/:id", function(req, res) {
  const { id } = req.params;
  const tarefasFiltradas = data.filter(item => item.id != id);

  res.json(tarefasFiltradas);
});

// Put /tarefas/{identificador}: alterar os dados da tarefa correspondente ao identificador; os novos dados devem ser passados no corpo da requisição HTTP.
app.put("/tarefas/:id", function(req, res) {
  const { id } = req.params;
  const tarefa = data.find(item => item.id == id);
  
  if (!tarefa) return res.status(204).json();

  const { descricao } = req.body;

  tarefa.descricao = descricao;

  res.json(tarefa);
});


app.listen(3000, function() {
  console.log("Server is running");
});
