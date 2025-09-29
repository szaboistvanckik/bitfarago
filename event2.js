function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');

let draggedItem = null;

window.addEventListener('DOMContentLoaded', loadTasks);

addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (!taskText) return;

    createTaskElement(taskText, false);
    saveTasks();
    newTaskInput.value = '';
}

function createTaskElement(text, completed) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.draggable = true;
    if (completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = text;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'task-buttons';

    const doneBtn = document.createElement('button');
    doneBtn.textContent = '✔';
    doneBtn.title = 'Elvégzett';
    doneBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.title = 'Törlés';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    buttonsDiv.appendChild(doneBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonsDiv);

    // Drag & Drop
    li.addEventListener('dragstart', () => {
        draggedItem = li;
        setTimeout(() => li.style.display = 'none', 0);
    });

    li.addEventListener('dragend', () => {
        draggedItem = null;
        li.style.display = 'flex';
        saveTasks();
    });

    li.addEventListener('dragover', (e) => e.preventDefault());

    li.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedItem !== li) {
            taskList.insertBefore(draggedItem, li);
        }
    });

    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}