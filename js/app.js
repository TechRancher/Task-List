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
    if(confirm("You must add something to the list before submit.")) {
      removeEmpty();
    } else {
      removeEmpty();
    }
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
    }
  }
}

// Clear Task
function clearTasks() {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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



function removeEmpty() {
  taskList.removeChild(taskList.lastChild);
}



