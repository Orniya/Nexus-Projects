const VALID_PRIORITIES = ["high", "medium", "low"];

function validateTitle(title) {
if (typeof title !== "string" || title.trim() === "") {
return {
valid: false,
message: "Task title is required."
};
}

return {
    valid: true,
    message: ""
};

}

function validatePriority(priority) {
if (!VALID_PRIORITIES.includes(priority)) {
return {
valid: false,
message: "Please select a valid priority."
};
}

return {
    valid: true,
    message: ""
};

}

function validateTask(title, priority) {
const titleValidation = validateTitle(title);

if (!titleValidation.valid) {
    return titleValidation;
}

const priorityValidation = validatePriority(priority);

if (!priorityValidation.valid) {
    return priorityValidation;
}

return {
    valid: true,
    message: ""
};

}


export { validateTitle, validatePriority, validateTask };