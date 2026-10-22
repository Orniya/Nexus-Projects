// Genrating a unique ID
let nextId = 1;
function generateId(){

     return nextId++;
}


// Creating a Task    
function createTask(taskTitle, taskDescription, taskPriority){
    return {
     id : generateId(),
     title : taskTitle,
     description : taskDescription,
     priority : taskPriority,
     completed : false
    } 
};


// testing the createTask Function
console.log(createTask("class", "going to class", "high"));
console.log(createTask("Study JavaScript", "Revise objects", "high"));
console.log(createTask("Attend class", "Software engineering lecture", "medium"));
console.log(createTask("Clean desk", "Organize study space", "low"));




// updating task
function updateTask(task,updates){

     // less efficient method(first trial)
     // const copiedTask = {...task}
     // const copiedUpdate = {...updates}

     // for(const item in copiedTask){
     //      if(item in copiedUpdate){
     //           copiedTask[item] = copiedUpdate[item];
     //      } 
     // }

     // return copiedTask;

     // simpler and shorter way of updating
     const updatedTasks ={ ...task, ...updates};
     return updatedTasks;

}

//testing the updateTask function
const task = {
    title: "Study JavaScript",
    priority: "high"
};

const updates = {
    priority: "low",
    completed: true
};

console.log(updateTask(task,updates));

// deleting tasks

const tasks = [
    { id: 1, title: "Study JavaScript" },
    { id: 2, title: "Attend class" },
    { id: 3, title: "Practice coding" }
];


function deleteTask(tasks,taskId){

    return tasks.filter((task) =>{
          return task.id !==taskId;
     });

     

}

 console.log(deleteTask(tasks,2));