const projectCollection = {};

const createTodo = ({title, dueDate, priority}) => {
    const id = crypto.randomUUID();
    return {
        id,
        title,
        dueDate,
        priority,
        isComplete : false,
        toggleCompleteStatus() {
            this.isComplete = !this.isComplete;
        }
    }
};

const createProject = (name) => {
    projectCollection[name] = [];
};

const addToProject = (name, data) => {
    const todo = createTodo(data);
    projectCollection[name].push(todo);
};

const defaultProject = createProject('Default');
const secondProject = createProject('Test');
const thirdProject = createProject('Test 3');


console.log(projectCollection);


export { projectCollection, createProject, addToProject };