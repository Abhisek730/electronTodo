const todoList = document.getElementById("todo-list");
const form = document.querySelector("form");
const input = document.querySelector("input");

let todos = [];

// Add new todo to the list
function addTodo() {
  event.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    const todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    todos.push(todo);
    displayTodos();
    input.value = "";
  }
}

// Remove a todo from the list
function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  displayTodos();
}

// Update the completed status of a todo
function toggleCompleted(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  displayTodos();
}

// Display the list of todos
function displayTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleCompleted(todo.id));
    const span = document.createElement("span");
    span.innerText = todo.text;
    const button = document.createElement("button");
    button.innerText = "Delete";
    button.addEventListener("click", () => removeTodo(todo.id));
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
  });
}

// Load the list of todos from localStorage
function loadTodos() {
  const data = localStorage.getItem("todos");
  if (data !== null) {
    todos = JSON.parse(data);
    displayTodos();
  }
}

// Save the list of todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Register the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

// Add event listeners
form.addEventListener("submit", addTodo);
window.addEventListener("beforeunload", saveTodos);

// Load the list of todos
loadTodos();
