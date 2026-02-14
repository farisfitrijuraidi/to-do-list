import { projectCollection, createProject, addToProject, projectNames } from "./todo.js";

const sidebar = document.querySelector('#side-bar');
const mainContent = document.querySelector('#main-content');
const dialog = document.querySelector('#dialog');
const showDialog = document.querySelector('#showDialog');
const cancelBtn = document.querySelector('#cancel-btn');
const form = document.querySelector('form');

let currentProject = 'default'; 

const createP = (text) => {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
}

const displayProject = () => {
    projectNames.forEach(item => {
        const button = document.createElement('button');
        button.textContent = item;
        button.classList.add('button', 'sidebar');
        button.dataset.projectId = crypto.randomUUID();
        button.addEventListener('click', getCurrentProject);
        sidebar.appendChild(button);//() => {
    });
        
}

const getCurrentProject = (e) => {
    currentProject = e.target.textContent;
    console.log(currentProject);
    displayTodo();
};

const displayTodo = () => {
    mainContent.innerHTML = '';
    projectCollection[currentProject].forEach(todo => {  
        mainContent.appendChild(createP(`Title: ${todo.title}`));
        mainContent.appendChild(createP(`Description: ${todo.description}`));
        mainContent.appendChild(createP(`Due Date: ${todo.dueDate}`));
        mainContent.appendChild(createP(`Priority: ${todo.priority}`));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Task';
        deleteBtn.classList.add('button', 'delete');
        deleteBtn.dataset.todoId = todo.id;
        deleteBtn.addEventListener('click', handleRemove);
        mainContent.appendChild(deleteBtn);
    })            
}

const handleRemove = (e) => {
    // e.target.closest('#main-content').remove();
    const idToDelete = e.target.dataset.todoId;
    projectCollection[currentProject] = projectCollection[currentProject].filter(item => item.id !== idToDelete);
    displayTodo();
    console.log(projectCollection);
}

const insertTodo = (event) => {
    event.preventDefault();
    const todoData = {
        title: title.value,
        description: description.value,
        dueDate: dueDate.value,
        priority: dialog.querySelector("input[name='priority']:checked").value === 'None'
    };
    addToProject(currentProject, todoData);
    console.log(projectCollection);
    displayTodo();
    dialog.close();
};

showDialog.addEventListener('click', () => {
    dialog.showModal();
});
form.addEventListener('submit', insertTodo);
cancelBtn.addEventListener('click', () => {
    dialog.close();
});


export { projectNames, displayProject, dialog, currentProject };

