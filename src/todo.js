const projectCollection = {};

const createTodo = ({title, description, dueDate, priority}) => {
    return {
        title,
        description,
        dueDate,
        priority
    }
};

const createProject = (name) => {
    projectCollection[name] = [];
};

const addToProject = (name, data) => {
    const todo = createTodo(data);
    projectCollection[name].push(todo);
};

export { projectCollection, createProject, addToProject };