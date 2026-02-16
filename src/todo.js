let projectCollection = {};

const createTodo = ({title, dueDate, priority}) => {
    const id = crypto.randomUUID();
    return {
        id,
        title,
        dueDate,
        priority,
        isComplete : false,
    }
};

const createProject = (name) => {
    projectCollection[name] = [];
    saveToLocal();
};

const addToProject = (name, data) => {
    const todo = createTodo(data);
    projectCollection[name].push(todo);
    saveToLocal();
};

const saveToLocal = () => {
    console.log("Saving to local storage...");
    const myObj = projectCollection;
    const myJSON = JSON.stringify(myObj);
    localStorage.setItem("myToDoList", myJSON);
};

const loadFromLocal = () => {
    let text = localStorage.getItem("myToDoList");
    console.log("Loading from local storage:", text);
    if (text) {
        let obj = JSON.parse(text);
        Object.assign(projectCollection, obj);
        console.log("Data parsed successfully!");
    } else {
        console.log("No saved data found.");
    };   
}
loadFromLocal();

export { projectCollection, createProject, addToProject, saveToLocal };