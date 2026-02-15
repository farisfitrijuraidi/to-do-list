import { projectCollection, createProject, addToProject } from "./todo.js";

const sidebar = document.querySelector('#side-bar');
const mainContent = document.querySelector('main');
const form = document.querySelector('form');
const addTask = document.querySelector('#addTask-btn');
const addProject = document.querySelector('#addProject');
let projectNames = Object.keys(projectCollection || {});

// let projectName;
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
        sidebar.appendChild(button);
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
        console.log(todo.isComplete);  
        const titleLabel = document.createElement('div');
        titleLabel.classList.add('title');
        mainContent.appendChild(titleLabel);

        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.dataset.todoId = todo.id;
        inputCheckbox.addEventListener('click', () => {
            if (inputCheckbox.checked) {
                todo.toggleCompleteStatus();
                console.log(todo.isComplete);
            } else {
                todo.isComplete = false;
            }
        })
        titleLabel.prepend(inputCheckbox);

        if (todo.isComplete) {
            inputCheckbox.checked = true;
        }

        const spanTitle = document.createElement('span');
        spanTitle.classList.add('title-checkmark');
        spanTitle.textContent = todo.title;
        titleLabel.appendChild(spanTitle);

        const titleBtn = document.createElement('button');
        titleBtn.classList.add('title-button');
        titleLabel.appendChild(titleBtn);

        const plusIcon = document.createElement('span');
        plusIcon.classList.add('plus-icon');
        plusIcon.textContent = '+';
        titleBtn.appendChild(plusIcon);

        const minusIcon = document.createElement('span');
        minusIcon.classList.add('minus-icon');
        minusIcon.textContent = '-';
        titleBtn.appendChild(minusIcon);

        const divPanel = document.createElement('div');
        divPanel.classList.add('panel');
        mainContent.appendChild(divPanel);

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
    accordion();
}

const insertTodo = (event) => {
    event.preventDefault();
    const todoData = {
        title: title.value,
        dueDate: dueDate.value,
        priority: title.value
    };
    console.log(todoData);
    addToProject(currentProject, todoData);
    displayTodo();
    accordion();
};

const accordion = () => {
    const expandTitle = document.querySelectorAll('.title-button');
    expandTitle.forEach(title => {
        title.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.parentElement.nextElementSibling;
            console.log(panel);
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        })
    })
};


form.addEventListener('submit', insertTodo);
addProject.addEventListener('click', () => {
    let newProjectName = prompt("Please type your project's name");
    if (newProjectName === '' || newProjectName === null) {
        return;
    } else {
        sidebar.innerHTML = '';
        console.log(newProjectName);
        createProject(newProjectName);
        projectNames = Object.keys(projectCollection || {});
        console.log(projectNames);
        displayProject();
    }
    }
)

export { projectNames, displayProject, currentProject, accordion };

