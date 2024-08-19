import {renderer, html} from './lib.js';
import { taskTemplate, } from './views/partials/taskTemplate.js';
import { api } from './storageManagement.js';

let todoList = api.getTodo();
if(!todoList){
    api.addTodo([]);
    todoList = api.getTodo();
}



const changeStatus = (event) => {
    const liElement = event.target.parentElement;
    if(liElement.classList.contains('unchecked')){
        liElement.classList.replace('unchecked','checked');   
    }else{
        liElement.classList.replace('checked','unchecked');
    }
    
}

function attachListeners(){
    const checkboxes = document.querySelectorAll('.checkboxes');
    if(checkboxes){
        checkboxes.forEach(checkbox => checkbox.addEventListener("click",changeStatus));
        checkboxes.forEach(checkbox => {
            if(checkbox.checked){
                checkbox.checked = false;
                checkbox.parentElement.classList.replace('checked','unchecked');
            }
        });
    }
}


const homePageTemplate = (tasks,onSubmit,onDeleteAll,onComplete) => html`
<div class="container">
        <div class="todoApp">
            <h2>To-do list <img src="images/business-to-do-list-flat-icon-modern-style-vector.jpg"></h2>
            <div class="row">
            <form @submit=${onSubmit} class="form">
            <input type='text' name="newTask" id="inputBox" placeholder="Add your task">
                <button id="addBtn" type="submit" >Add</button>
            </form>
            </div>
            <div class="inProgress">
            ${tasks.length? html`<ul>${tasks.map(taskTemplate)}</ul>`: null}
            </div>

                <br>
                    ${tasks.length? html`<div class="completeHolder">
                        <button @click=${onComplete} id="completeBtn">Complete checked</button>
                    </div>` : null}
                    


                    <br>

                <div class="bottomPart">
                <span>${tasks.length} total items</span>
                ${tasks.length? html`<button @click=${onDeleteAll} id="deleteBtn">Delete all items</button>` : null}
                
                </div>

        </div>

    </div>
`

renderer(homePageTemplate(todoList,onSubmit,onDeleteAll,onComplete));
attachListeners();



function onSubmit(ev){
ev.preventDefault();
const formData = new FormData(ev.target);
const newTask = formData.get("newTask");
if(!newTask){
    return alert('Field cannot be empty!');
}
let tasks = api.getTodo();
if(tasks.includes(newTask)){
    return alert(`${newTask} is already on the list`);
}
tasks.push(newTask);
api.addTodo(tasks);
ev.target.reset();
renderer(homePageTemplate(tasks,onSubmit,onDeleteAll,onComplete));
attachListeners();
}


function onDeleteAll(){
    api.removeTodo();
    todoList = [];
    api.addTodo(todoList);
    renderer(homePageTemplate(todoList,onSubmit,onDeleteAll,onComplete));
}


function onComplete(){
    let checkedElements = document.querySelectorAll('.checked');
    if(!checkedElements.length){
        return alert('No tasks checked');
    }
    checkedElements.forEach(element => {
        const taskText = element.textContent.trim();
        api.removeTask(taskText)});

    todoList = api.getTodo();
    
    renderer(homePageTemplate(todoList,onSubmit,onDeleteAll,onComplete));
    attachListeners();

}



