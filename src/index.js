import "./style.css";
import { projectCollection, createProject, addToProject } from "./todo.js";

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

console.log(projectCollection);