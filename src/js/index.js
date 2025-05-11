let tasks = { todo: [], done: [] };

window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  setTheme(savedTheme);
  const lstorage = localStorage.getItem("tasks");

  if (!lstorage) {
    tasks = { todo: [], done: [] };
  } else {
    tasks = JSON.parse(lstorage);
    populateLists();
  }
};

function populateLists() {
  const todo = document.getElementById("todo-tasks");
  const done = document.getElementById("done-tasks");

  todo.innerHTML = "";
  done.innerHTML = "";

  if (tasks.todo.length == 0) {
    const p = document.createElement("p");
    p.innerHTML = "nenhuma tarefa encontrada";
    p.style.padding = "5px 10px";
    todo.appendChild(p);
  }

  if (tasks.done.length == 0) {
    const p = document.createElement("p");
    p.innerHTML = "nenhuma tarefa encontrada";
    p.style.padding = "5px 10px";
    p.style.textDecoration = "none";
    done.appendChild(p);
  }

  tasks.todo.forEach((elem) => {
    const task = document.createElement("div");
    const p = document.createElement("p");
    p.innerHTML = elem.text;

    const btns = document.createElement("div");
    const complete = document.createElement("button");
    complete.innerHTML = "✔️";
    const del = document.createElement("button");
    del.innerHTML = "✖️";

    complete.addEventListener("click", () => completeTask(elem));
    del.addEventListener("click", () => deleteTask(elem));

    btns.appendChild(complete);
    btns.appendChild(del);

    task.appendChild(p);
    task.appendChild(btns);
    task.classList.add("task"); // opcional: classe para estilização

    todo.appendChild(task);
  });

  tasks.done.forEach((elem) => {
    const task = document.createElement("div");
    const p = document.createElement("p");
    p.innerHTML = elem.text;

    const btns = document.createElement("div");
    const del = document.createElement("button");
    del.innerHTML = "✖️";

    del.addEventListener("click", () => deleteTask(elem));

    btns.appendChild(del);

    task.appendChild(p);
    task.appendChild(btns);
    task.classList.add("task"); // opcional: classe para estilização

    done.appendChild(task);
  });
}

function completeTask(task) {
  const updateTodo = tasks.todo.filter((elem) => elem.id != task.id);
  tasks.done.push(task);

  tasks.todo = updateTodo;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  populateLists();
}

function deleteTask(task) {
  const updateTodo = tasks.todo.filter((elem) => elem.id != task.id);
  const updateDone = tasks.done.filter((elem) => elem.id != task.id);

  tasks.todo = updateTodo;
  tasks.done = updateDone;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  populateLists();
}

function saveTodo() {
  const input = document.getElementById("todo-text");

  if (!input.value) {
    alert("Informe a tarefa a ser feita");
    return;
  }

  const newTask = {
    id: Math.random(),
    text: input.value,
  };

  tasks.todo.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  populateLists();
}

function setTheme(theme) {
  document.body.className = "";

  // Adiciona a nova classe
  if (!theme) {
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    return;
  }

  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
}
