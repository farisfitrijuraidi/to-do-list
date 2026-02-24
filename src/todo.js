let projectCollection = {};

const createTodo = ({title, dueDate, priority, subTask = []}) => {
    const id = crypto.randomUUID();
    return {
        id,
        title,
        dueDate,
        priority,
        subTask,
        isComplete : false,
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
    let activeProject;
    projectCollection[name] = [];
    if (Object.keys(projectCollection).length === 1) {
        activeProject = name;
    }
    saveToLocal();
    return activeProject;
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