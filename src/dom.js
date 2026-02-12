import { projectCollection } from "./todo.js";

const sidebar = document.querySelector('#side-bar');
const mainContent = document.querySelector('#main-content');
const projectNames = Object.keys(projectCollection);

const displayProject = () => {
    projectNames.forEach(item => {
        const button = document.createElement('button');
        button.textContent = item;
        button.classList.add('button', 'sidebar');
        button.addEventListener('click', () => {
            projectCollection[item].forEach(todo => {
                mainContent.innerHTML = '';
                mainContent.appendChild(createP(`Title: ${todo.title}`));
                mainContent.appendChild(createP(`Description: ${todo.description}`));
                mainContent.appendChild(createP(`Due Date: ${todo.dueDate}`));
                mainContent.appendChild(createP(`Priority: ${todo.priority}`));
            })   
        });
        sidebar.appendChild(button);
    })
}

const createP = (text) => {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
}

// const displayTodo = (item) => {
//     mainContent.innerHTML = '';
//     projectCollection[item].forEach(todo => {
//         //Title
//         const title = document.createElement('p');
//         title.textContent = `Title: ${todo.title}`;
//         mainContent.appendChild(title);
//         //Desc
//         const desc = document.createElement('p');
//         desc.textContent = `Description: ${todo.description}`;
//         mainContent.appendChild(desc);
//         //dueDate
//         const dueDate = document.createElement('p');
//         dueDate.textContent = `Due Date: ${todo.dueDate}`;
//         mainContent.appendChild(dueDate);
//         //Priority
//         const priority = document.createElement('p');
//         priority.textContent = `Priority: ${todo.priority}`;
//         mainContent.appendChild(priority);
//     })            
// }

export { projectNames, displayProject };

