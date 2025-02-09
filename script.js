// script.js
document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Load tasks from localStorage
  loadTasks();

  // Add task
  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      taskInput.value = '';
      saveTasks();
    }
  });

  // Add task on pressing Enter
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
        saveTasks();
      }
    }
  });

  // Function to add a new task
  function addTask(taskText, isCompleted = false) {
    const li = document.createElement('li');
    li.textContent = taskText;

    if (isCompleted) {
      li.classList.add('completed');
    }

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(li);
      saveTasks();
    });

    // Toggle completed task
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((li) => {
      tasks.push({
        text: li.textContent.replace('Delete', '').trim(),
        completed: li.classList.contains('completed'),
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
      addTask(task.text, task.completed);
    });
  }
});
