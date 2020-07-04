var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");

var todos = [];

async function renderTodos() {
  let res = await fetch("/todos");
  todos = await res.json();
  console.log("res", res);
  listElement.innerHTML = "";

  for (todo of todos) {
    var todoElement = document.createElement("li");
    var todoText = document.createTextNode(todo.title);

    var linkElement = document.createElement("a");

    linkElement.setAttribute("href", "#");

    var pos = todos.indexOf(todo);
    linkElement.setAttribute("onclick", `deleteTodo("${todo._id}")`);

    var linkText = document.createTextNode("done");

    linkElement.appendChild(linkText);

    todoElement.appendChild(todoText);
    todoElement.appendChild(linkElement);
    listElement.appendChild(todoElement);
  }
}

renderTodos();

async function addTodo() {
  var todoText = inputElement.value;
  await fetch("/addtodo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: todoText }),
  });
  inputElement.value = "";
  renderTodos();
}

buttonElement.onclick = addTodo;

async function deleteTodo(id) {
  await fetch(`/deletetodo/${id}`);
  renderTodos();
}
