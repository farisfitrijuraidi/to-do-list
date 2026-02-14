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
        const titleBtn = document.createElement('button');
        titleBtn.classList.add('title-button');
        titleBtn.textContent = todo.title;
        mainContent.appendChild(titleBtn);

        const divPanel = document.createElement('div');
        divPanel.classList.add('panel');
        mainContent.appendChild(divPanel);

        divPanel.appendChild(createP(todo.description));
        divPanel.appendChild(createP(todo.dueDate));
        divPanel.appendChild(createP(todo.priority));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Task';
        deleteBtn.classList.add('button', 'delete');
        deleteBtn.dataset.todoId = todo.id;
        deleteBtn.addEventListener('click', handleRemove);
        mainContent.appendChild(deleteBtn);
    })            
}

const handleRemove = (e) => {
    const idToDelete = e.target.dataset.todoId;
    projectCollection[currentProject] = projectCollection[currentProject].filter(item => item.id !== idToDelete);
    displayTodo();
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
    displayTodo();
    dialog.close();
    accordion();
};

const accordion = () => {
    const expandTitle = document.querySelectorAll('.title-button');
    expandTitle.forEach(title => {
        title.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        })
    })
};

showDialog.addEventListener('click', () => {
    dialog.showModal();
});
form.addEventListener('submit', insertTodo);
cancelBtn.addEventListener('click', () => {
    dialog.close();
});


export { projectNames, displayProject, dialog, currentProject };

