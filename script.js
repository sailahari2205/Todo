// Get HTML elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const pendingTasksList = document.getElementById('pending-tasks-list');
const completedTasksList = document.getElementById('completed-tasks-list');

// Add event listener to add task button
addTaskBtn.addEventListener('click', addTask);

// Task array to store tasks
let tasks = [];

// Add task to the list
function addTask() {
  const taskText = taskInput.value.trim(); 
  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      addedAt: new Date()
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = '';
  }
}

// Render the tasks on the page
function renderTasks() {
  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  for (const task of tasks) {
    const li = document.createElement('li');
    li.innerText = `${task.text} - ${task.addedAt.toLocaleString()}`;

    if (task.completed) {
      li.classList.add('completed-task');
      completedTasksList.appendChild(li);
    } else {
      const completeButton = document.createElement('button');
      completeButton.innerText = 'Complete';
      completeButton.addEventListener('click', () => markTaskComplete(task.id));
      li.appendChild(completeButton);
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => deleteTask(task.id));
      li.appendChild(deleteButton);
      pendingTasksList.appendChild(li);
    }
  }
}

// Mark a task as completed
function markTaskComplete(id) {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;
    renderTasks();
  }
}

// Delete a task from the list
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Initial render
renderTasks();