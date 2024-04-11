import Todo from './Todo.js';
import Project from './Project.js';

const projects = [];
let currentProject = null;

const newProjectForm = document.getElementById('new-project-form');
const projectsElement = document.getElementById('projects');
const mainElement = document.getElementById('main');

function renderProjects() {
    projectsElement.innerHTML = '';
    projects.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.textContent = project.title;
        projectElement.dataset.projectIndex = index;
        projectElement.addEventListener('click', (e) => {
            currentProject = projects[e.target.dataset.projectIndex];
            renderMain();
        })
        projectsElement.appendChild(projectElement);
    });
}

function renderMain() {
    mainElement.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.textContent = currentProject.title;
    mainElement.appendChild(h2);

    const newTodoForm = document.createElement('form');
    newTodoForm.id = 'new-todo-form';
    mainElement.appendChild(newTodoForm);

    const titleLabel = document.createElement('label');
    titleLabel.for = 'title';
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.required = true;
    titleInput.autofocus = true;
    titleInput.value = "Untitled Todo";
    newTodoForm.appendChild(titleLabel);
    newTodoForm.appendChild(titleInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.for = 'description';
    descriptionLabel.textContent = 'Description';
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.id = 'description';
    newTodoForm.appendChild(descriptionLabel);
    newTodoForm.appendChild(descriptionInput);

    const dueDateLabel = document.createElement('label');
    dueDateLabel.for = 'due-date';
    dueDateLabel.textContent = 'Due Date';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.id = 'due-date';
    newTodoForm.appendChild(dueDateLabel);
    newTodoForm.appendChild(dueDateInput);

    const priorityLabel = document.createElement('label');
    priorityLabel.for = 'priority';
    priorityLabel.textContent = 'Priority';
    const priorityInput = document.createElement('input');
    priorityInput.type = 'number';
    priorityInput.id = 'priority';
    newTodoForm.appendChild(priorityLabel);
    newTodoForm.appendChild(priorityInput);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Todo';
    newTodoForm.appendChild(submitButton);

    newTodoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = newTodoForm.elements['title'].value;
        const description = newTodoForm.elements['description'].value;
        const dueDate = newTodoForm.elements['due-date'].value;
        const priority = newTodoForm.elements['priority'].value;
        const newTodo = new Todo(title, description, dueDate, priority);
        currentProject.addTodo(newTodo);
        renderMain();
    })

    const todosElement = document.createElement('div');
    todosElement.id = 'todos';
    mainElement.appendChild(todosElement);

    currentProject.todos.forEach((todo, index) => {
        const todoElement = document.createElement('div');
        todoElement.textContent = todo.title;
        todoElement.dataset.todoIndex = index;
        todosElement.appendChild(todoElement);
    });
}

newProjectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = newProjectForm.elements['project-title'].value;
    const description = newProjectForm.elements['project-description'].value;
    const newProject = new Project(title, description);
    projects.push(newProject);
    renderProjects();
    newProjectForm.reset();
})