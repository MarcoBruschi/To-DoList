const inputTask = document.getElementById('input-task');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const checkBox = document.querySelector('.box');

let taskCount = 0;

function addTask() {
    if (inputTask.value.trim() === '') {
        return;
    }
    if (taskCount < 10) {
        const newTask = document.createElement('li');
        newTask.innerHTML = `<div class="task-item">
                                <input type="checkbox">
                                ${inputTask.value}
                            </div>
                            <button class="removeTask">x</button>`;
        taskList.appendChild(newTask);
        inputTask.value = '';
        taskCount++;
    } else {
        alert('Limite Atingido!');
    }
}

addTaskButton.addEventListener('click', addTask);
inputTask.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

taskList.addEventListener('click', function(e) {
    if (e.target.classList.contains('removeTask')) {
        const taskItem = e.target.parentElement;
        taskList.removeChild(taskItem);
        taskCount--;
    }
});

taskList.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox') {
        const taskDiv = e.target.parentElement;
        if (e.target.checked) {
            taskDiv.style.textDecoration = 'line-through';
        } else {
            taskDiv.style.textDecoration = 'none';
        }
    }
});