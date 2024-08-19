function getTodo(){
    return JSON.parse(localStorage.getItem('todo'));
}

function addTodo(task){
        localStorage.setItem('todo',JSON.stringify(task));
}

function removeTask(taskToRemove){
    let tasks = getTodo();
    tasks = tasks.filter(task => task !== taskToRemove);
    addTodo(tasks);

}


function removeTodo(){
    localStorage.removeItem('todo');
}


export const api = {
    getTodo,
    addTodo,
    removeTask,
    removeTodo
}