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

// testing the updateTask function
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

let tasks = [
    { id: 1, title: "Study JavaScript" },
    { id: 2, title: "Attend class" },
    { id: 3, title: "Practice coding" }
];


function deleteTask(tasks,taskId){
     

    let tasksAfterDeletion = tasks.filter((task) =>{
          return task.id !==taskId;
     }); 

     return tasksAfterDeletion;

}

let remainingTasks = deleteTask(tasks,2);
 console.log(remainingTasks);



//  mark as complete:
function markTaskComplete(task1){


     const completedTask = {...task1, completed: true};

     return completedTask;


}

// testing completion:
const task1 = {
    id: 1,
    title: "Study JavaScript",
    completed: false
};

console.log(markTaskComplete(task1));


// completion toggle function:


function toggleTaskComplete(task1){

     const objAfterToggle = {
          ...task1,
          completed : !task1.completed
     }

     return objAfterToggle;
      

}



console.log(toggleTaskComplete(task1));



// retrieve tasks:
function getTaskById(tasks, taskId){
     const chosenTask = tasks.find((task) => {
          return task.id === taskId;
     });

     return chosenTask;

}
console.log(getTaskById(tasks, 3));