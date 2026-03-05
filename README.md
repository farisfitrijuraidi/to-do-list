# To-Do List Application

[Live Demo](https://farisfitrijuraidi.github.io/todo-list/)

This is a dynamic, state-driven task management application. This project was built to master object-oriented programming, data architecture, and state management as part of The Odin Project's JavaScript curriculum.

The primary goal was to build a complex application where the underlying data logic is kept strictly separate from the visual interface, mimicking professional software architecture.

---

## Features

* **Project & Task Management**: Users can create distinct projects and populate them with specific tasks, including due dates and priority levels.
* **Nested Subtasks**: Each main task supports multiple subtasks. Users can edit, save, and check off individual subtasks dynamically.
* **Persistent Local Storage**: The application automatically saves user data to the browser's local storage the exact millisecond a change happens, ensuring no data is lost upon refreshing.
* **Responsive Sidebar UI**: Features a custom CSS Grid sidebar that mimics classic web browser tabs, complete with text-overflow handling for long project names.
* **Accessible & Polished Design**: Includes smooth CSS transition micro-interactions, highly visible focus rings for keyboard navigation, and mobile-friendly touch targets.

---

## What I Learned

This project was a deep dive into complex JavaScript mechanics and modern UI (User Interface) design. 

Key takeaways include:
* **The Model-View Architecture**: I successfully separated my code into a data engine (`todo.js`) and a screen renderer (`dom.js`). I learned the concept of 'Data Ownership', ensuring the display file only sends requests rather than mutating the data directly.
* **Closures and Variable Scope**: I conquered tricky bugs where event listeners were holding onto old 'snapshots' of variables. I learned how to pass newly created objects back into the correct local scope so all buttons share the same updated data.
* **Advanced State Management**: I learned to update the application's state (the current data held in memory) at the exact source of a user action, preventing crashes when interacting with deleted projects.
* **Modern Identifiers**: I implemented `crypto.randomUUID()` to generate completely unique IDs for every task and subtask, preventing data collisions.
* **CSS Grid Mathematics**: I experimented heavily with `auto-fill`, `auto-fit`, and fractional units (`1fr`) to control how the browser distributes empty space. I learned how to build fluid layouts that behave predictably across different screen sizes.

---

## Acknowledgements

* This project is based on the [To Do List assignment](https://www.theodinproject.com/lessons/node-path-javascript-todo-list) from The Odin Project.
* Fonts: 'Inter' and 'Delius' via Google Fonts (hosted locally).