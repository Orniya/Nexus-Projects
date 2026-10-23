const STORAGE_KEY = "taskManagementTasks";

function saveTasks(tasks) {
try {
localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
return true;
} catch (error) {
console.error("Failed to save tasks:", error);
return false;
}
}

function loadTasks() {
try {
const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (storedTasks === null) {
        return [];
    }

    const tasks = JSON.parse(storedTasks);

    if (!Array.isArray(tasks)) {
        console.error("Stored tasks data is invalid.");
        return [];
    }

    return tasks;
} catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
}

}

function clearTasks() {
try {
localStorage.removeItem(STORAGE_KEY);
return true;
} catch (error) {
console.error("Failed to clear tasks:", error);
return false;
}
}

export { saveTasks, loadTasks, clearTasks };