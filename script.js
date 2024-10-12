document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    // Load tasks from Local Storage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.forEach((taskText) => {
        const li = createTaskElement(taskText);
        taskList.appendChild(li);
      });
    }
  
    function createTaskElement(taskText) {
      const li = document.createElement("li");
      li.textContent = taskText;
  
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");
  
      removeButton.onclick = () => {
        li.remove();
        removeTaskFromLocalStorage(taskText);
      };
  
      li.appendChild(removeButton);
      return li;
    }
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task.");
      } else {
        const li = createTaskElement(taskText);
        taskList.appendChild(li);
        saveTaskToLocalStorage(taskText);
        taskInput.value = "";
      }
    }
  
    function saveTaskToLocalStorage(task) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function removeTaskFromLocalStorage(task) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = tasks.filter(t => t !== task);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  
    addButton.addEventListener("click", addTask);
  
    taskInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        addTask();
      }
    });
  
    // Call loadTasks to populate the task list on page load
    loadTasks();
  });

