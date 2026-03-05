let projectCollection = {};

const randomColor = () => {
    const letter = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letter[Math.floor(Math.random() * 16)];
    }
    return color;
};

const createTodo = ({title, dueDate, priority, subTask = []}) => {
    const id = crypto.randomUUID();
    const color = randomColor();
    return {
        id,
        title,
        dueDate,
        priority,
        subTask,
        isComplete : false,
        color,
    }
};

const createSubTask = ({title}) => {
    const id = crypto.randomUUID();
    return {
        id,
        title,
        isComplete : false,
    }
};

const addToToDo = (todo, obj) => {
    todo.push(obj);
    saveToLocal();
};

const createProject = (name) => {
    const foundProject = Object.keys(projectCollection).find(project => project === name);
    if (foundProject) {
        alert('Project name existed.');
        return foundProject;
    } else {
        projectCollection[name] = [];
        saveToLocal();
        return name;
    }
};

const addToProject = (name, data) => {
    const todo = createTodo(data);
    projectCollection[name].push(todo);
    saveToLocal();
};

const saveToLocal = () => {
    const myObj = projectCollection;
    const myJSON = JSON.stringify(myObj);
    localStorage.setItem("myToDoList", myJSON);
};

const loadFromLocal = () => {
    let text = localStorage.getItem("myToDoList");
    if (text) {
        let obj = JSON.parse(text);
        Object.assign(projectCollection, obj);
    }
}
loadFromLocal();

export { projectCollection, createProject, addToProject, saveToLocal, createSubTask, addToToDo };