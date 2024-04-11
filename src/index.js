import Todo from './Todo.js';
import Project from './Project.js';
import './style.scss';

const projects = [];
let currentProject = null;

const newProjectForm = document.getElementById('new-project-form');
const projectsElement = document.getElementById('projects');
const mainElement = document.getElementById('main');
const detailsElement = document.getElementById('details');

function renderProjects() {
    projectsElement.innerHTML = '';
    projects.forEach((project, index) => {
        const projectElement = document.createElement('a');
        projectElement.textContent = project.title;
        projectElement.classList.add('project');
        projectElement.dataset.projectIndex = index;
        projectElement.addEventListener('click', (e) => {
            currentProject = projects[e.target.dataset.projectIndex];
            const projectElements = projectsElement.querySelectorAll('.project');
            projectElements.forEach((projectElement) => {
                projectElement.classList.remove('is-active');
            })
            projectElement.classList.add('is-active');
            renderMain();
        })
        projectsElement.appendChild(projectElement);
    });
}

function renderMain() {
    mainElement.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.textContent = currentProject.title;
    h2.classList.add('is-size-5');
    mainElement.appendChild(h2);

    const todosElement = document.createElement('div');
    todosElement.id = 'todos';
    mainElement.appendChild(todosElement);

    currentProject.todos.forEach((todo, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        todosElement.appendChild(card);

        const todoElement = document.createElement('div');
        todoElement.textContent = todo.title;
        todoElement.dataset.todoIndex = index;
        todoElement.classList.add('card-content');
        card.appendChild(todoElement);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.todoIndex = index;
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', (e) => {
            const index = e.target.dataset.todoIndex;
            currentProject.todos[index].toggleCompleted();
            renderMain();
        })
        todoElement.prepend(checkbox);

        const buttonContainer = document.createElement('div');
        todoElement.appendChild(buttonContainer);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('button', 'is-danger', 'is-small');
        deleteButton.dataset.todoIndex = index;
        deleteButton.addEventListener('click', (e) => {
            const index = e.target.dataset.todoIndex;
            currentProject.removeTodo(index);
            renderMain();
            clearDetails(index);
        })
        buttonContainer.appendChild(deleteButton);

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Details';
        detailsButton.classList.add('button', 'is-info', 'is-small');
        detailsButton.dataset.todoIndex = index;
        detailsButton.addEventListener('click', (e) => {
            const index = e.target.dataset.todoIndex;
            renderDetails(currentProject.todos[index], index);
        })
        buttonContainer.appendChild(detailsButton);
    });

    const h3 = document.createElement('h3');
    h3.textContent = 'New Todo';
    h3.classList.add('is-size-4');
    mainElement.appendChild(h3);

    const newTodoForm = document.createElement('form');
    newTodoForm.id = 'new-todo-form';
    newTodoForm.classList.add('box');
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
    submitButton.classList.add('button', 'is-primary');
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
}

function renderDetails(todo, index) {
    detailsElement.innerHTML = '';
    detailsElement.dataset.todoIndex = index;

    const h3 = document.createElement('h3');
    h3.textContent = 'Details';
    detailsElement.appendChild(h3);

    const detailsForm = document.createElement('form');
    detailsForm.id = 'details-form';
    detailsElement.appendChild(detailsForm);

    const titleLabel = document.createElement('label');
    titleLabel.for = 'details-title';
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'details-title';
    titleInput.value = todo.title;
    detailsForm.appendChild(titleLabel);
    detailsForm.appendChild(titleInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.for = 'details-description';
    descriptionLabel.textContent = 'Description';
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.id = 'details-description';
    descriptionInput.value = todo.description;
    detailsForm.appendChild(descriptionLabel);
    detailsForm.appendChild(descriptionInput);

    const dueDateLabel = document.createElement('label');
    dueDateLabel.for = 'details-due-date';
    dueDateLabel.textContent = 'Due Date';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.id = 'details-due-date';
    dueDateInput.value = todo.dueDate;
    detailsForm.appendChild(dueDateLabel);
    detailsForm.appendChild(dueDateInput);

    const priorityLabel = document.createElement('label');
    priorityLabel.for = 'details-priority';
    priorityLabel.textContent = 'Priority';
    const priorityInput = document.createElement('input');
    priorityInput.type = 'number';
    priorityInput.id = 'details-priority';
    priorityInput.value = todo.priority;
    detailsForm.appendChild(priorityLabel);
    detailsForm.appendChild(priorityInput);

    const completedLabel = document.createElement('label');
    completedLabel.for = 'details-completed';
    completedLabel.textContent = 'Completed';
    const completedInput = document.createElement('input');
    completedInput.type = 'checkbox';
    completedInput.id = 'details-completed';
    completedInput.checked = todo.completed;
    detailsForm.appendChild(completedLabel);
    detailsForm.appendChild(completedInput);

    const updateButton = document.createElement('button');
    updateButton.type = 'submit';
    updateButton.textContent = 'Update Todo';
    updateButton.addEventListener('click', (e) => {
        e.preventDefault();
        todo.title = detailsForm.elements['details-title'].value;
        todo.description = detailsForm.elements['details-description'].value;
        todo.dueDate = detailsForm.elements['details-due-date'].value;
        todo.priority = detailsForm.elements['details-priority'].value;
        todo.completed = detailsForm.elements['details-completed'].checked;
        renderMain();
    })
    detailsForm.appendChild(updateButton);
}

function clearDetails(index) {
    if (index == detailsElement.dataset.todoIndex) {
        detailsElement.innerHTML = '';
    }
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