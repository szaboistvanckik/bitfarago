const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');

let draggedItem = null;

addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    li.className = 'task-item';
    li.draggable = true;

    const span = document.createElement('span');
    span.textContent = taskText;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'task-buttons';

    const doneBtn = document.createElement('button');
    doneBtn.textContent = '✔';
    doneBtn.title = 'Elvégzett';
    doneBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.title = 'Törlés';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    buttonsDiv.appendChild(doneBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonsDiv);

    // Drag & Drop események
    li.addEventListener('dragstart', () => {
        draggedItem = li;
        setTimeout(() => li.style.display = 'none', 0);
    });

    li.addEventListener('dragend', () => {
        draggedItem = null;
        li.style.display = 'flex';
    });

    li.addEventListener('dragover', (e) => e.preventDefault());

    li.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedItem !== li) {
            taskList.insertBefore(draggedItem, li);
        }
    });

    taskList.appendChild(li);
    newTaskInput.value = '';
}