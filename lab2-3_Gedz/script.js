// Масив для зберігання справ
let todos = [];

// Додаємо нову справу
function newTodo() {
  const input = document.getElementById("newTodoInput");
  const task = input.value.trim();
  if (task) {
    todos.push({ text: task, completed: false });
    input.value = "";
    render();
    updateCounter();
  }
}

// Створюємо розмітку для однієї справи
function renderTodo(todo, index) {
  return `
   <li class="todo-item ${todo.completed ? "completed" : ""}">
     <input type="checkbox" ${
       todo.completed ? "checked" : ""
     } onchange="checkTodo(${index})">
     <label>${todo.text}</label>
     <button onclick="deleteTodo(${index})">Видалити</button>
   </li>
 `;
}

// Відображення всіх справ
function render() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = todos
    .map((todo, index) => renderTodo(todo, index))
    .join("");
}

// Оновлення лічильників
function updateCounter() {
  const totalCounter = document.getElementById("totalCounter");
  const pendingCounter = document.getElementById("pendingCounter");
  totalCounter.textContent = todos.length;
  pendingCounter.textContent = todos.filter((todo) => !todo.completed).length;
}

// Видалення справи
function deleteTodo(index) {
  todos.splice(index, 1);
  render();
  updateCounter();
}

// Відмітка справи як виконаної
function checkTodo(index) {
  todos[index].completed = !todos[index].completed;
  render();
  updateCounter();
}

// Додаємо обробник для кнопки додавання
document.getElementById("addTodoBtn").addEventListener("click", newTodo);

// Додаємо обробник для Enter у полі вводу
document
  .getElementById("newTodoInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      newTodo();
    }
  });

// Ініціалізація лічильників
updateCounter();
