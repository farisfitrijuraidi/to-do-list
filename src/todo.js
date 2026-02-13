const projectCollection = {};

const createTodo = ({title, description, dueDate, priority}) => {
    const id = crypto.randomUUID();
    return {
        id,
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

const defaultProject = createProject('default');
const testProject2 = createProject('Test');

const projectNames = Object.keys(projectCollection || {});

export { projectCollection, createProject, addToProject, projectNames };