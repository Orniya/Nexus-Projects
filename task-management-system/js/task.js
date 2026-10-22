let nextId = 1;
function generateId(){

     return nextId++;



}
    
function createTask(taskTitle, taskDescription, taskPriority){

   
    return {
     id : generateId(),
     title : taskTitle,
     description : taskDescription,
     priority : taskPriority,
     completed : false
    
    }
   
    
};


console.log(createTask("class", "going to class", "high"));
console.log(createTask("Study JavaScript", "Revise objects", "high"));
console.log(createTask("Attend class", "Software engineering lecture", "medium"));
console.log(createTask("Clean desk", "Organize study space", "low"));



const task = {
    title: "Study JavaScript",
    priority: "high"
};

const updates = {
    priority: "low",
    completed: true
};

function updateTask(task,updates){

     // const copiedTask = {...task}
     // const copiedUpdate = {...updates}

     // for(const item in copiedTask){
     //      if(item in copiedUpdate){
     //           copiedTask[item] = copiedUpdate[item];
     //      } 
     // }

     // return copiedTask;

     const updatedTasks ={ ...task, ...updates};
     return updatedTasks;

}



console.log(updateTask(task,updates));