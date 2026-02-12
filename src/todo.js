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

const testProject = createProject('test');
const testProject2 = createProject('anotherTest');

addToProject('test', {
    title: "Buy Eggs",
    description: "Must Chicken Eggs",
    dueDate: "Today",
    priority: "Normal"
});

addToProject('anotherTest', {
    title: "Buy Milk",
    description: "Must Cow Milk",
    dueDate: "Tomorrow",
    priority: "Not Urgent"
});

export { projectCollection, createProject, addToProject };