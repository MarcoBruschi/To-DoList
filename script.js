const form = document.querySelector('#task-form')

const filterAll = document.querySelector('#filter-all')
const filterPending = document.querySelector('#filter-pending')
const filterCompleted = document.querySelector('#filter-completed')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

filterPending.addEventListener('click', () => {
  const pendingTasks = tasks.filter(task => task.done === false)
  displayTasks(pendingTasks)
})

filterAll.addEventListener('click', () => {
  displayTasks(tasks)
})

filterCompleted.addEventListener('click', () => {
  const completedTasks = tasks.filter(task => task.done === true)
  displayTasks(completedTasks)
})

const displayTasks = (listToDisplay) => {
  const taskList = document.querySelector('#task-list')
  taskList.innerHTML = ''

  listToDisplay.forEach(task => {
    const taskLi = document.createElement('li')
    taskLi.classList.add('task')
    taskLi.innerHTML = `
      <span class="task-text">${task.name}</span>
      <div class="actions">
        <button class="toggle-btn">${task.done ? '✅' : '⭕'}</button>
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      </div>
   `
    taskList.append(taskLi)

    taskLi.querySelector('.delete-btn').addEventListener('click', () => {
      const index = tasks.findIndex(t => t.id === task.id)
      tasks.splice(index, 1)
      updateLocalStorage()
      displayTasks(tasks)
    })

    taskLi.querySelector('.edit-btn').addEventListener('click', () => {
      const newName = prompt('Digite o nome da tarefa')
      if (newName.trim() !== '') {
        task.name = newName
        updateLocalStorage()
        displayTasks(tasks)
      }
    })

    taskLi.querySelector('.toggle-btn').addEventListener('click', () => {
      task.done ? task.done = false : task.done = true
      updateLocalStorage()
      displayTasks(tasks)
    })
  });
}

const tasksExists = (tasks, taskname) => {
  return tasks.filter(task => task.name === taskname).some(task => task.done === false)
}

form.addEventListener('submit', (event) => {

  event.preventDefault()
  const taskname = document.querySelector('#task-input').value

  const task = {
    id: Date.now(),
    name: taskname,
    done: false
  }

  if (tasksExists(tasks, taskname)) {
    alert('Tarefa já adicionada')
  } else {
    tasks.push(task)
    updateLocalStorage()
  }

  displayTasks(tasks)

  form.reset()
})

displayTasks(tasks)