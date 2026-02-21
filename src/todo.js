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
        title
    }
};

const addToToDo = (todo, data) => {
    const newsubTask = createSubTask(data);
    todo.push(newsubTask);
    saveToLocal();
};

const createProject = (name) => {
    projectCollection[name] = [];
    const id = crypto.randomUUID();
    saveToLocal();
    return {
        id
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