// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove Task event
  taskList.addEventListener("click", removeTask);
  // Clear Task event
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Add Task
function addTask(e) {
  if(taskInput.value === ""){
   alert("Please add something in the Task List.");
   required;
  }
  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class 
  link.className = "delete-item secondary-content";
  // Add icon htmlaria-hidden="true"
  link.innerHTML = `<i class="far fa-trash-alt"></i>`;
  // Append the link to li
  li.appendChild(link);
  // Append the li to ul
  taskList.appendChild(li);
  // store in local storage
  storeTaskInLocalStorage(taskInput.value);
  // Clear input
  taskInput.value = "";
  // Prevent Default
  e.preventDefault();
  
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains("delete-item")) {
    if(confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStoreage(e.target.parentElement.parentElement);
    }
  }
}

// Remove Task from LS
function removeTaskFromLocalStoreage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Task
function clearTasks() {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear Tasks From LS
  clearTasksFromLocalStorage();
}

// Clear Tasks From LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// Store Task In Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    // Add class 
    link.className = "delete-item secondary-content";
    // Add icon htmlaria-hidden="true"
    link.innerHTML = `<i class="far fa-trash-alt"></i>`;
    // Append the link to li
    li.appendChild(link);
    // Append the li to ul
    taskList.appendChild(li);
  })
}




function removeEmpty() {
  taskList.removeChild(taskList.lastChild);
}



