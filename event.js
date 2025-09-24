const images = document.querySelectorAll('.image-container img');
const button = document.getElementById('image-toggle-btn');
let currentIndex = -1;

button.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    images.forEach(image => image.style.display = 'none');
    images[currentIndex].style.display = 'block';
});

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

function show(button) {
    const card = button.parentElement;
    const ps = card.querySelectorAll('p');
    const intro = ps[1];

    const cards = document.querySelectorAll('.card');
    const index = Array.from(cards).indexOf(card);

    const intros = [
      "Tiszta rosszul vagyok",
      "Tiszta gyagyás itt minden",
      "Be van rosszulva tisztára"
    ];

    intro.innerText = intros[index];
    intro.classList.add('show');
}

//--------------------------------------------------------------------------

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