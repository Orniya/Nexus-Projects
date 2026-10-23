import {
createTask,
updateTask,
deleteTask,
toggleTaskComplete
} from "./task.js";

import {
validateTask
} from "./validation.js";

import {
saveTasks,
loadTasks
} from "./storage.js";

let tasks = loadTasks();
let currentFilter = "all";
let searchQuery = "";


const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("filter-select");
const formMessage = document.getElementById("form-message");

const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const pendingCount = document.getElementById("pending-count");


function persistTasks() {
const saved = saveTasks(tasks);

if (!saved) {
    showMessage("Could not save tasks. Please check your browser storage.", true);
}

}


function showMessage(message, isError = false) {
formMessage.textContent = message;
formMessage.classList.toggle("error", isError);
formMessage.classList.toggle("success", !isError);
}

function getSelectedPriority() {
const selectedPriority = document.querySelector(
'input[name="priority"]'
);

return selectedPriority ? selectedPriority.value : "";

}

function renderTasks() {
taskList.replaceChildren();

const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
        task.title.toLowerCase().includes(searchQuery) ||
        (task.description || "").toLowerCase().includes(searchQuery);

    const matchesFilter =
        currentFilter === "all" ||
        (currentFilter === "completed" && task.completed) ||
        (currentFilter === "pending" && !task.completed);

    return matchesSearch && matchesFilter;
});

if (filteredTasks.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No tasks found.";
    taskList.appendChild(emptyMessage);
}

filteredTasks.forEach((task) => {
    const taskCard = document.createElement("article");
    taskCard.className = "task-card";

    if (task.completed) {
        taskCard.classList.add("completed");
    }

    const title = document.createElement("h3");
    title.textContent = task.title;

    const description = document.createElement("p");
    description.textContent = task.description || "No description";

    const priority = document.createElement("span");
    priority.textContent = `Priority: ${task.priority}`;
    priority.className = `priority-${task.priority}`;

    const status = document.createElement("p");
    status.textContent = task.completed ? "Completed" : "Pending";

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.textContent = task.completed
        ? "Mark Pending"
        : "Complete";

    completeButton.addEventListener("click", () => {
        tasks = tasks.map((currentTask) =>
            currentTask.id === task.id
                ? toggleTaskComplete(currentTask)
                : currentTask
        );

        persistTasks();
        renderTasks();
    });

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {
        editTask(task.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        const confirmed = confirm(
            `Delete "${task.title}"?`
        );

        if (!confirmed) return;

        tasks = deleteTask(tasks, task.id);

        persistTasks();
        renderTasks();
        showMessage("Task deleted successfully.");
    });

    taskCard.append(
        title,
        description,
        priority,
        status,
        completeButton,
        editButton,
        deleteButton
    );

    taskList.appendChild(taskCard);
});

// Update statistics
const completedTasks = tasks.filter((task) => task.completed).length;
const pendingTasks = tasks.length - completedTasks;

totalCount.textContent = tasks.length;
completedCount.textContent = completedTasks;
pendingCount.textContent = pendingTasks;

}

// Create a task
taskForm.addEventListener("submit", (event) => {
event.preventDefault();

const title = titleInput.value.trim();
const description = descriptionInput.value.trim();
const priority = getSelectedPriority();

const validation = validateTask(title, priority);

if (!validation.valid) {
    showMessage(validation.message, true);
    return;
}

const newTask = createTask(title, description, priority);

tasks.push(newTask);

persistTasks();
taskForm.reset();

showMessage("Task created successfully.");
renderTasks();

});

// Edit an existing task
function editTask(taskId) {
const task = tasks.find((item) => item.id === taskId);

if (!task) {
    showMessage("Task not found.", true);
    return;
}

const newTitle = prompt("Enter the new task title:", task.title);

if (newTitle === null) return;

const newDescription = prompt(
    "Enter the new description:",
    task.description || ""
);

if (newDescription === null) return;

const newPriority = prompt(
    "Enter priority: high, medium, or low",
    task.priority
);

if (newPriority === null) return;

const title = newTitle.trim();
const description = newDescription.trim();
const priority = newPriority.trim().toLowerCase();

const validation = validateTask(title, priority);

if (!validation.valid) {
    showMessage(validation.message, true);
    return;
}

const updates = {
    title,
    description,
    priority
};

tasks = tasks.map((currentTask) =>
    currentTask.id === taskId
        ? updateTask(currentTask, updates)
        : currentTask
);

persistTasks();
renderTasks();
showMessage("Task updated successfully.");

}


searchInput.addEventListener("input", () => {
searchQuery = searchInput.value.trim().toLowerCase();
renderTasks();
});

filterSelect.addEventListener("change", () => {
currentFilter = filterSelect.value;
renderTasks();
});


renderTasks();