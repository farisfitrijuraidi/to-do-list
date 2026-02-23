import { projectCollection, createProject, addToProject, saveToLocal, createSubTask, addToToDo } from "./todo.js";

const sidebar = document.querySelector('#side-bar');
const mainContent = document.querySelector('main');
const form = document.querySelector('form');
const addProject = document.querySelector('#addProject');
let projectNames = Object.keys(projectCollection || {});

let currentProject = 'default'; 

const createP = (text) => {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
}

const displayProject = () => {
    projectNames.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('project-button');
        sidebar.appendChild(div);
        const spanButton = document.createElement('span');
        spanButton.textContent = item;
        spanButton.classList.add('button', 'sidebar');
        spanButton.dataset.projectId = item.id;
        spanButton.addEventListener('click', getCurrentProject);
        const closeProjectButton = document.createElement('span');
        closeProjectButton.classList.add('close-project');
        closeProjectButton.textContent = 'x';
        closeProjectButton.addEventListener('click', (e) => {
            sidebar.innerHTML = '';
            mainContent.innerHTML = '';
            delete projectCollection[item];
            projectNames = Object.keys(projectCollection || {}); 
            displayProject();
        })
        div.appendChild(closeProjectButton);
        div.appendChild(spanButton);
    });
    saveToLocal();
}

const getCurrentProject = (e) => {
    currentProject = e.target.textContent;
    console.log(currentProject);
    displayTodo();
};

const displayTodo = () => {
    mainContent.innerHTML = '';
    projectCollection[currentProject].forEach(todo => { 
        const titleLabel = document.createElement('div');
        titleLabel.classList.add('title');
        mainContent.appendChild(titleLabel);

        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.dataset.todoId = todo.id;
        inputCheckbox.addEventListener('click', () => {
            if (inputCheckbox.checked) {
                todo.isComplete = !todo.isComplete;
                saveToLocal();
            } else {
                todo.isComplete = false;
                saveToLocal();
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
        titleBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            const panel = this.parentElement.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        })
        titleLabel.appendChild(titleBtn);

        const expandIcon = document.createElement('span');
        expandIcon.classList.add('mdi', 'mdi-chevron-right-circle');
        expandIcon.style.cursor = "pointer";
        expandIcon.style.fontSize = "24px";
        titleBtn.appendChild(expandIcon);

        const minimiseIcon = document.createElement('span');
        minimiseIcon.classList.add('mdi', 'mdi-chevron-down-circle');
        minimiseIcon.style.cursor = "pointer";
        minimiseIcon.style.fontSize = "24px";
        titleBtn.appendChild(minimiseIcon);

        const divPanel = document.createElement('div');
        divPanel.classList.add('panel');
        mainContent.appendChild(divPanel);
        const divSubTask = document.createElement('div');
        divSubTask.classList.add('divSubTask');
        divPanel.appendChild(divSubTask);

        const addSubTask = document.createElement('button');
        addSubTask.classList.add('add-subTask');
        addSubTask.textContent = '+';
        todo.subTask.forEach(item => renderSubTask(item, divSubTask, todo));
        addSubTask.addEventListener('click', () => {
            renderSubTask('',divSubTask, todo);
        });
        titleBtn.appendChild(addSubTask);

        const divDescription = document.createElement('div');
        divDescription.classList.add('divDescription');
        divPanel.appendChild(divDescription);
        const formDescription = document.createElement('form');
        const descriptionLabel = document.createElement('label');
        descriptionLabel.for = 'description';
        divDescription.appendChild(formDescription);
        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.id = 'description';
        descriptionInput.name = 'description';
        descriptionInput.placeholder = 'Add description...';
        todo.description === undefined ? descriptionInput.value === '': descriptionInput.value = todo.description;
        const saveDescription = document.createElement('button');
        saveDescription.textContent = 'Save';
        formDescription.addEventListener('submit', (event) => {
            event.preventDefault();
            todo.description = descriptionInput.value;
            saveToLocal();
        });
        formDescription.appendChild(descriptionLabel);
        descriptionLabel.appendChild(saveDescription);
        descriptionLabel.appendChild(descriptionInput);
        titleLabel.appendChild(createP(todo.dueDate));
        titleLabel.appendChild(createP(todo.priority));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Task';
        deleteBtn.classList.add('button', 'delete');
        deleteBtn.dataset.todoId = todo.id;
        deleteBtn.addEventListener('click', handleRemove);
        mainContent.appendChild(deleteBtn);

        const openPanel = Array.from(document.querySelectorAll('.panel'));
        if (openPanel) {
            openPanel.forEach(ele => ele.style.maxHeight = ele.scrollHeight + "px");
        }
    })            
}
const handleRemove = (e) => {
    const idToDelete = e.target.dataset.todoId;
    projectCollection[currentProject] = projectCollection[currentProject].filter(item => item.id !== idToDelete);
    displayTodo();
    saveToLocal();
}
const insertTodo = (event) => {
    event.preventDefault();
    const todoData = {
        title: title.value,
        dueDate: dueDate.value,
        priority: title.value
    };
    addToProject(currentProject, todoData);
    displayTodo();
    saveToLocal();
};

const renderSubTask = (item, targetContainer, targetTask) => {
    const formSubTask = document.createElement('form');
    const labelSubTask = document.createElement('label');
    labelSubTask.for = 'subtask';
    targetContainer.appendChild(formSubTask);
    formSubTask.appendChild(labelSubTask);
    const inputSubTask = document.createElement('input');
    inputSubTask.type = 'text';
    inputSubTask.id = 'subtask';
    inputSubTask.name = 'subtask';
    inputSubTask.dataset.subTaskid = item.id;
    if (targetTask.subTask.length === 0) {
        inputSubTask.value = ''  
    } else if (targetTask.subTask.length > 0) {
        inputSubTask.value = item.title || '';
    }
    labelSubTask.appendChild(inputSubTask);
    const saveSubTask = document.createElement('button');
    saveSubTask.textContent = 'Save';
    labelSubTask.appendChild(saveSubTask);
    const editSubTask = document.createElement('button');
    editSubTask.textContent = 'Edit';
    if (inputSubTask.value !== '') {
        editSubTask.disabled = false;
        saveSubTask.disabled = true;
    } else {
        editSubTask.disabled = true;
        saveSubTask.disabled = false;
    }
    const closeSubTaskButton = document.createElement('span');
    closeSubTaskButton.classList.add('close-subtask');
    closeSubTaskButton.textContent = 'x';
    closeSubTaskButton.addEventListener('click', (e) => {
        closeSubTaskButton.dataset.subTaskid = item.id || '';
        if (closeSubTaskButton.dataset.subTaskid === '') {
            e.target.parentElement.parentElement.remove();
        } else {
            const idToDelete = e.target.dataset.subTaskid;
            targetTask.subTask = targetTask.subTask.filter(item => item.id !== idToDelete);
            e.target.parentElement.parentElement.remove();
            saveToLocal();
        }
    })
    editSubTask.addEventListener('click', (event) => {
        event.preventDefault();
        saveSubTask.disabled = false;
        saveSubTask.addEventListener('click', (e) => {
            const foundSubTask = targetTask.subTask.find(obj => obj.id === e.target.previousElementSibling.dataset.subTaskid);
            console.log(foundSubTask);
            console.log(targetTask.subTask);
            console.log(e.target.previousElementSibling.dataset.subTaskid);
            foundSubTask.title = inputSubTask.value;
            saveSubTask.disabled = true;
            saveToLocal();
        })
    })
    labelSubTask.appendChild(editSubTask);
    formSubTask.addEventListener('submit', (event) => {
        event.preventDefault();
        const subTaskData = {
                title: inputSubTask.value,
            }
        const newsubTask = createSubTask(subTaskData);
        inputSubTask.dataset.subTaskid = newsubTask.id;
        addToToDo(targetTask.subTask, newsubTask);
        saveSubTask.disabled = true; 
        closeSubTaskButton.dataset.subTaskid = newsubTask.id;
        closeSubTaskButton.addEventListener('click', (e) => {
            const idToDelete = e.target.dataset.subTaskid;
            targetTask.subTask = targetTask.subTask.filter(item => item.id !== idToDelete);
            e.target.parentElement.parentElement.remove();
            saveToLocal();
        })
        
        if (saveSubTask.disabled) {
            editSubTask.disabled = false;
        } 
        saveToLocal();  
    })
    labelSubTask.appendChild(closeSubTaskButton);
}
    
form.addEventListener('submit', insertTodo);
addProject.addEventListener('click', () => {
    let newProjectName = prompt("Please type your project's name");
    if (newProjectName === '' || newProjectName === null) {
        return;
    } else {
        sidebar.innerHTML = '';
        createProject(newProjectName);
        projectNames = Object.keys(projectCollection || {});
        displayProject();
    }
})

export { projectNames, displayProject, currentProject };

