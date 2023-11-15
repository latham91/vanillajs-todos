const todoForm = document.querySelector("form");
const todoInput = document.querySelector("#addTodoInput");
const todoContainer = document.querySelector("#todoContainer");
const searchInput = document.querySelector("#searchInput");

let todoListFromLocalStorage = JSON.parse(localStorage.getItem("todoList"));
let todoList = todoListFromLocalStorage || [];

renderTodoList(todoListFromLocalStorage);

// CREATE TODO ELEMENT
function createTodoElement(todo) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  const todoTitle = document.createElement("p");
  todoTitle.classList.add("todo-item_title");
  todoTitle.textContent = todo.title;

  const todoDeleteBtn = document.createElement("button");
  todoDeleteBtn.classList.add("todo-item_delete");
  todoDeleteBtn.textContent = "Delete";

  todoDeleteBtn.addEventListener("click", (e) => deleteTodo(e, todo.id));

  todoItem.appendChild(todoTitle);
  todoItem.appendChild(todoDeleteBtn);

  return todoItem;
}

// CREATE NO TODOS ELEMENT
function noTodos() {
  const noTodosElement = document.createElement("div");
  noTodosElement.classList.add("todo-empty");
  noTodosElement.textContent = "No todos found.";

  return noTodosElement;
}

// RENDER TODO LIST
function renderTodoList(list) {
  todoContainer.innerHTML = "";

  if (list.length === 0) {
    noTodoDiv = noTodos();
    return todoContainer.appendChild(noTodoDiv);
  }

  list.forEach((todo) => {
    const todoItem = createTodoElement(todo);
    todoContainer.appendChild(todoItem);
  });
}

// DELETE TODO
function deleteTodo(e, id) {
  const filteredTodos = todoList.filter((todo) => todo.id !== id);

  todoList = filteredTodos;

  localStorage.setItem("todoList", JSON.stringify(todoList));

  renderTodoList(todoList);
}

// ADD TODO
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (todoInput.value.trim() === "") {
    todoInput.value = "";
    return alert("Please enter a valid todo.");
  }

  const newTodo = {
    id: Math.floor(Math.random() * 1000000),
    title: todoInput.value,
  };

  todoList.push(newTodo);

  todoInput.value = "";

  localStorage.setItem("todoList", JSON.stringify(todoList));

  renderTodoList(todoList);
});

// SEARCH TODO
searchInput.addEventListener("keyup", (e) => {
  const searchValue = e.target.value;
  const filteredTodos = todoList.filter((todo) =>
    todo.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  renderTodoList(filteredTodos);
});
