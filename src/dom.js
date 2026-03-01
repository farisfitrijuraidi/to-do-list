import { projectCollection, createProject, addToProject, saveToLocal, createSubTask, addToToDo } from "./todo.js";

const sidebar = document.querySelector('#side-bar');
const mainContent = document.querySelector('main');
const form = document.querySelector('form');
const addProject = document.querySelector('#addProject');
let projectNames = Object.keys(projectCollection || {});
let currentProject;

const createP = (text) => {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
};

const displayProject = () => {
    projectNames.forEach(item => {
        const div = createNode('div', 'project-button', '');
        sidebar.appendChild(div);

        // Project Button Logic
        const spanButton = createNode('span', 'button sidebar', item);
        spanButton.dataset.projectId = item.id;
        spanButton.addEventListener('click', getCurrentProject);

        // Close Project Button Logic
        const closeProjectButton = createNode('span', 'close-project', 'x');
        closeProjectButton.addEventListener('click', () => {
            handleCloseProjectButton(item)
        });

        div.appendChild(closeProjectButton);
        div.appendChild(spanButton);
    })
    saveToLocal();
};

const handleCloseProjectButton = (targetItem) => {
    sidebar.innerHTML = '';
    mainContent.innerHTML = '';
    delete projectCollection[targetItem];
    projectNames = Object.keys(projectCollection || {}); 
    displayProject();
};

const getCurrentProject = (e) => {
    currentProject = e.target.textContent;
    console.log(currentProject);
    displayTodo();
};

const createNode = (type, className, text) => {
    const element = document.createElement(type);
    
    if (className) {
        const classArray = className.split(' ');
        element.classList.add(...classArray);
    }
    if (text) {
        element.textContent = text;
    }
    
    return element;
};

const displayTodo = () => {
    mainContent.innerHTML = '';
    projectCollection[currentProject].forEach(todo => {
        // Main Task Logic
        const titleLabel = createNode('div', 'title', '');
        mainContent.appendChild(titleLabel);
        const spanTitle = createNode('span', 'title-checkmark', todo.title);
        titleLabel.appendChild(spanTitle);
        titleLabel.appendChild(createP(todo.dueDate));
        titleLabel.appendChild(createP(todo.priority));

        const divPanel = createNode('div', 'panel active', '');
        mainContent.appendChild(divPanel);
        
        // Checkbox Logic
        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.dataset.todoId = todo.id;
        inputCheckbox.addEventListener('click', () => {
            handleCheckbox(inputCheckbox, todo)
        });
        titleLabel.prepend(inputCheckbox);
        if (todo.isComplete) {
            inputCheckbox.checked = true;
        }

        // Accordion Logic
        const titleBtn = createNode('button', 'title-button', '');
        const expandIcon = createNode('span', 'mdi mdi-chevron-right-circle', '');
        expandIcon.style.cursor = "pointer";
        expandIcon.style.fontSize = "24px";
        titleBtn.appendChild(expandIcon);
        const minimiseIcon = createNode('span', 'mdi mdi-chevron-down-circle', '');
        minimiseIcon.style.cursor = "pointer";
        minimiseIcon.style.fontSize = "24px";
        titleBtn.appendChild(minimiseIcon);
        titleBtn.addEventListener('click', () => {
            handleAccordion(divPanel, expandIcon, minimiseIcon)
        });
        if (divPanel.classList.contains('active')) {
            divPanel.style.maxHeight = divPanel.scrollHeight + "px";
            expandIcon.style.display = 'none';
            minimiseIcon.style.display = 'block';
        }
        titleLabel.appendChild(titleBtn);
        

        // Subtask Logic
        const divSubTask = createNode('div', 'divSubTask', '');
        divPanel.appendChild(divSubTask);
        const addSubTask = createNode('button', 'add-subTask', '+');
        todo.subTask.forEach(item => renderSubTask(item, divSubTask, todo, divPanel));
        addSubTask.addEventListener('click', (e) => {
            handleSubTask(e, divSubTask, todo, divPanel, expandIcon, minimiseIcon)
        });
        titleBtn.appendChild(addSubTask);

        // Description Logic
        const divDescription = createNode('div', 'divDescription', '');
        divPanel.appendChild(divDescription);
        const saveDescription = createNode('button', '', 'Save');
        const descriptionLabel = document.createElement('label');
        const formDescription = document.createElement('form');
        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.id = 'description';
        descriptionInput.name = 'description';
        descriptionInput.placeholder = 'Add description...';
        todo.description === undefined ? descriptionInput.value = '': descriptionInput.value = todo.description;
        formDescription.addEventListener('submit', (e) => {
            handleDescription(e, todo, descriptionInput)
        });
        divDescription.appendChild(formDescription);
        formDescription.appendChild(descriptionLabel);
        descriptionLabel.appendChild(saveDescription);
        descriptionLabel.appendChild(descriptionInput);

        const deleteBtn = createNode('button', 'button delete', 'Delete Task');
        deleteBtn.dataset.todoId = todo.id;
        deleteBtn.addEventListener('click', handleRemove);
        mainContent.appendChild(deleteBtn);

        const openPanel = Array.from(document.querySelectorAll('.panel'));
        if (openPanel) {
            openPanel.forEach(ele => ele.style.maxHeight = ele.scrollHeight + "px");
        }
    })
};

const handleRemove = (e) => {
    const idToDelete = e.target.dataset.todoId;
    projectCollection[currentProject] = projectCollection[currentProject].filter(item => item.id !== idToDelete);
    displayTodo();
    saveToLocal();
};

const handleDescription = (e, targetTask, targetEle) => {
    e.preventDefault();
    targetTask.description = targetEle.value;
    saveToLocal();
};

const handleSubTask = (e, targetDiv, targetTask, targetPanel, targetIcon1, targetIcon2) => {
    e.stopPropagation();
    renderSubTask('', targetDiv, targetTask, targetPanel);
    if (!targetPanel.classList.contains('active')) {
        targetPanel.classList.toggle('active');
        targetPanel.style.maxHeight = targetPanel.scrollHeight + "px";
        targetIcon1.style.display = 'none';
        targetIcon2.style.display = 'block';
    }
};

const handleCheckbox = (target, targetToDo) => {
    if (target.checked) {
        targetToDo.isComplete = !targetToDo.isComplete;
        saveToLocal();
    } else {
        targetToDo.isComplete = false;
        saveToLocal();
    }
};

const handleAccordion = (targetPanel, targetIcon1, targetIcon2) => {
    targetPanel.classList.toggle('active');
    if (targetPanel.classList.contains('active')) {
        targetPanel.style.maxHeight = targetPanel.scrollHeight + "px";
        targetIcon1.style.display = 'none';
        targetIcon2.style.display = 'block';
    } else {
        targetPanel.style.maxHeight = "0px";
        targetIcon1.style.display = 'block';
        targetIcon2.style.display = 'none';
    }
};

const insertTodo = (event) => {
    event.preventDefault();
    if (!currentProject) {
        alert('No active project selected!');
        return;
    } else {
        const todoData = {
            title: title.value,
            dueDate: dueDate.value,
            priority: document.getElementById('priority').value
        };
        addToProject(currentProject, todoData);
        displayTodo();
        saveToLocal();
    }
};

const renderSubTask = (item, targetContainer, targetTask, targetContainer2) => {
    let newsubTask;
    const formSubTask = document.createElement('form');
    targetContainer.appendChild(formSubTask);
    const labelSubTask = document.createElement('label');
    formSubTask.appendChild(labelSubTask);

    // InputSubTask Logic
    const inputSubTask = document.createElement('input');
    inputSubTask.type = 'text';
    inputSubTask.id = 'subtask';
    inputSubTask.name = 'subtask';
    inputSubTask.dataset.subTaskid = item.id;
    if (targetTask.subTask.length === 0) {
        inputSubTask.value = ''  
    } else if (targetTask.subTask.length > 0) {
        inputSubTask.value = item.title || '';
    };
    labelSubTask.appendChild(inputSubTask);

    // SubTask Checkbox Logic
    const subTaskCheckbox = document.createElement('input');
    subTaskCheckbox.type = 'checkbox';
    subTaskCheckbox.addEventListener('click', () => {
        handleSubTaskCheckBox(newsubTask, inputSubTask, subTaskCheckbox, item)
    });
    if (/\d/.test(inputSubTask.dataset.subTaskid)) {
        labelSubTask.prepend(subTaskCheckbox);
    };
    if (item.isComplete) {
        subTaskCheckbox.checked = true;
    };

    // Save SubTask Logic
    const saveSubTask = createNode('button', '', 'Save');
    labelSubTask.appendChild(saveSubTask);

    // Edit SubTask Logic
    const editSubTask = createNode('button', '', 'Edit');
    if (inputSubTask.value !== '') {
        editSubTask.disabled = false;
        saveSubTask.disabled = true;
    } else {
        editSubTask.disabled = true;
        saveSubTask.disabled = false;
    };
    editSubTask.addEventListener('click', (e) => {
        handleEditSubTask(e, saveSubTask)
    });
    labelSubTask.appendChild(editSubTask);

    // Close SubTaskButton Logic
    const closeSubTaskButton = createNode('span', 'close-subtask', 'x');
    closeSubTaskButton.addEventListener('click', (e) => {
        handleCloseSubTaskButton(e, inputSubTask, targetTask)
    });
    labelSubTask.appendChild(closeSubTaskButton);

    // Form Submit Logic
    formSubTask.addEventListener('submit', (e) => {
        newsubTask = handleFormSubmit(e, targetTask, inputSubTask, saveSubTask, newsubTask, closeSubTaskButton, labelSubTask, subTaskCheckbox, editSubTask)
    });

    targetContainer2.style.maxHeight = targetContainer2.scrollHeight + "px";
}; 

const handleFormSubmit = (e, targetTask2, targetInput, targetSubTaskButton, targetNewSubTask, targetSubTaskButton2, targetLabel, targetSTCheckbox, targetEditST) => {
    e.preventDefault();
    const foundSubTask = targetTask2.subTask.find(obj => obj.id === targetInput.dataset.subTaskid || '');
    if (foundSubTask) {
        foundSubTask.title = targetInput.value;
        targetSubTaskButton.disabled = true;
        saveToLocal();
    } else {
        const subTaskData = {
                title: targetInput.value,
            }
        targetNewSubTask = createSubTask(subTaskData);
        targetInput.dataset.subTaskid = targetNewSubTask.id;
        addToToDo(targetTask2.subTask, targetNewSubTask);
        targetSubTaskButton.disabled = true; 
        targetSubTaskButton2.dataset.subTaskid = targetNewSubTask.id;
        targetLabel.prepend(targetSTCheckbox);
    }
    if (targetSubTaskButton.disabled) {
        targetEditST.disabled = false;
    } 
    saveToLocal(); 
    return targetNewSubTask; 
};

const handleEditSubTask = (e, targetButton) => {
    e.preventDefault();
    targetButton.disabled = false;
};

const handleCloseSubTaskButton = (e, targetInput, targetTask2) => {
    if (targetInput.dataset.subTaskid) {
        const idToDelete = targetInput.dataset.subTaskid;
        targetTask2.subTask = targetTask2.subTask.filter(item => item.id !== idToDelete);
        e.target.parentElement.parentElement.remove();
        saveToLocal();
    } else {
        e.target.parentElement.parentElement.remove();
    }
};

const handleSubTaskCheckBox = (targetSubTask, targetInput, targetSubTaskCheckbox, targetItem ) => {
    if (targetSubTask) {
        if (targetSubTask.id !== targetInput.dataset.subTaskid && targetSubTaskCheckbox.checked === true) {
            targetItem.isComplete = !targetItem.isComplete;
            saveToLocal();
        } else if (targetSubTask.id === targetInput.dataset.subTaskid && targetSubTaskCheckbox.checked === true ) {
            targetSubTask.isComplete = !targetSubTask.isComplete;
            saveToLocal();
        } else {
            targetSubTask.isComplete = false;
            saveToLocal();
        }
    } else {
        if (targetSubTaskCheckbox.checked === true) {
            targetItem.isComplete = !targetItem.isComplete;
            saveToLocal();
        } else {
            targetItem.isComplete = false;
            saveToLocal();
        }  
    }
};
    
form.addEventListener('submit', insertTodo);
addProject.addEventListener('click', () => {
    let newProjectName = prompt("Please type your project's name");
    if (newProjectName === '' || newProjectName === null) {
        return;
    } else {
        sidebar.innerHTML = '';
        currentProject = createProject(newProjectName);
        projectNames = Object.keys(projectCollection || {});
        displayProject();
    }
});

export { projectNames, displayProject, currentProject };

