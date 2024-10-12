document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    // Load tasks from Local Storage and display them on the page
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(task => createTaskElement(task)); // Populate task list
  
    function createTaskElement(taskText) {
      const li = document.createElement("li");
      li.textContent = taskText;
  
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");
  
      removeButton.onclick = () => {
        taskList.removeChild(li);
        removeTaskFromLocalStorage(taskText);
      };
  
      li.appendChild(removeButton);
      taskList.appendChild(li);
    }
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task.");
        return;
      }
      createTaskElement(taskText);
      saveTaskToLocalStorage(taskText);
      taskInput.value = "";
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
  });

