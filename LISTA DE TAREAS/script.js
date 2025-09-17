document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const counter = document.getElementById('counter');

  let tasks = [];

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      taskInput.value = '';
      renderTasks();
    }
  });

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.completed ? ' completed' : '');
      li.innerHTML = `
        <span>${task.text}</span>
        <div class="task-buttons">
          <button class="toggle">✓</button>
          <button class="edit">✎</button>
          <button class="delete">🗑</button>
        </div>
      `;

      li.querySelector('.toggle').addEventListener('click', () => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
      });

      li.querySelector('.edit').addEventListener('click', () => {
        const newText = prompt('Editar tarea:', tasks[index].text);
        if (newText) {
          tasks[index].text = newText.trim();
          renderTasks();
        }
      });

      li.querySelector('.delete').addEventListener('click', () => {
        tasks.splice(index, 1);
        renderTasks();
      });

      taskList.appendChild(li);
    });

    updateCounter();
  }

  function updateCounter() {
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    counter.textContent = `Completadas: ${completed} / Totales: ${total}`;
  }
});