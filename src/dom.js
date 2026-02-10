const sidebar = document.querySelector('#side-bar');
const mainContent = document.querySelector('#main-content');

const displayProject = (obj) => {
    const projectNames = Object.keys(obj);
    projectNames.forEach(item => {
        const button = document.createElement('button');
        button.textContent = item;
        button.classList.add('button', 'sidebar');
        sidebar.appendChild(button);
    })
}

export { displayProject };

