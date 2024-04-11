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
            detailsElement.innerHTML = '';
            renderMain();
        })
        projectsElement.appendChild(projectElement);
    });
}

function renderMain() {
    mainElement.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.textContent = currentProject.title;
    h2.classList.add('subtitle', 'is-4');
    mainElement.appendChild(h2);

    const description = document.createElement('p');
    description.textContent = currentProject.description;
    description.id = 'project-description';
    description.classList.add('has-text-primary');
    mainElement.appendChild(description);

    const todosElement = document.createElement('div');
    todosElement.id = 'todos';
    mainElement.appendChild(todosElement);

    if (currentProject.todos.length === 0) {
        const p = document.createElement('p');
        p.classList.add('box');
        p.textContent = 'No todos yet. Add one by clicking the "Add Todo" button.';
        todosElement.appendChild(p);
    }

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
    h3.classList.add('is-size-6');
    // mainElement.appendChild(h3);

    const newTodoForm = document.createElement('form');
    newTodoForm.id = 'new-todo-form';
    newTodoForm.classList.add('box');
    mainElement.appendChild(newTodoForm);

    const titleField = document.createElement('div');
    titleField.classList.add('field');
    const titleControl = document.createElement('div');
    titleControl.classList.add('control');
    const titleLabel = document.createElement('label');
    titleLabel.for = 'title';
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.classList.add('input');
    titleInput.required = true;
    titleInput.autofocus = true;
    titleInput.value = "Untitled Todo";
    titleField.appendChild(titleLabel);
    titleField.appendChild(titleControl);
    titleControl.appendChild(titleInput);
    newTodoForm.appendChild(titleField);

    const descriptionField = document.createElement('div');
    descriptionField.classList.add('field');
    const descriptionControl = document.createElement('div');
    descriptionControl.classList.add('control');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.for = 'description';
    descriptionLabel.textContent = 'Description';
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.id = 'description';
    descriptionInput.classList.add('input');
    descriptionField.appendChild(descriptionLabel);
    descriptionField.appendChild(descriptionControl);
    descriptionControl.appendChild(descriptionInput);
    newTodoForm.appendChild(descriptionField);

    const dueDateField = document.createElement('div');
    dueDateField.classList.add('field');
    const dueDateControl = document.createElement('div');
    dueDateControl.classList.add('control');
    const dueDateLabel = document.createElement('label');
    dueDateLabel.for = 'due-date';
    dueDateLabel.textContent = 'Due Date';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.id = 'due-date';
    dueDateInput.classList.add('input');
    dueDateField.appendChild(dueDateLabel);
    dueDateField.appendChild(dueDateControl);
    dueDateControl.appendChild(dueDateInput);
    newTodoForm.appendChild(dueDateField);

    const priorityField = document.createElement('div');
    priorityField.classList.add('field');
    const priorityControl = document.createElement('div');
    priorityControl.classList.add('control');
    const priorityLabel = document.createElement('label');
    priorityLabel.for = 'priority';
    priorityLabel.textContent = 'Priority';
    const priorityInput = document.createElement('input');
    priorityInput.type = 'number';
    priorityInput.id = 'priority';
    priorityInput.classList.add('input');
    priorityField.appendChild(priorityLabel);
    priorityField.appendChild(priorityControl);
    priorityControl.appendChild(priorityInput);
    newTodoForm.appendChild(priorityField);

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
    detailsElement.classList.add('is-active');

    const modalBackground = document.createElement('div');
    modalBackground.classList.add('modal-background');
    detailsElement.appendChild(modalBackground);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    detailsElement.appendChild(modalContent);

    const h3 = document.createElement('h3');
    h3.textContent = 'Details';
    modalContent.appendChild(h3);

    const detailsForm = document.createElement('form');
    detailsForm.id = 'details-form';
    modalContent.appendChild(detailsForm);

    const titleLabel = document.createElement('label');
    titleLabel.for = 'details-title';
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'details-title';
    titleInput.value = todo.title;
    modalContent.appendChild(titleLabel);
    modalContent.appendChild(titleInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.for = 'details-description';
    descriptionLabel.textContent = 'Description';
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.id = 'details-description';
    descriptionInput.value = todo.description;
    modalContent.appendChild(descriptionLabel);
    modalContent.appendChild(descriptionInput);

    const dueDateLabel = document.createElement('label');
    dueDateLabel.for = 'details-due-date';
    dueDateLabel.textContent = 'Due Date';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.id = 'details-due-date';
    dueDateInput.value = todo.dueDate;
    modalContent.appendChild(dueDateLabel);
    modalContent.appendChild(dueDateInput);

    const priorityLabel = document.createElement('label');
    priorityLabel.for = 'details-priority';
    priorityLabel.textContent = 'Priority';
    const priorityInput = document.createElement('input');
    priorityInput.type = 'number';
    priorityInput.id = 'details-priority';
    priorityInput.value = todo.priority;
    modalContent.appendChild(priorityLabel);
    modalContent.appendChild(priorityInput);

    const completedLabel = document.createElement('label');
    completedLabel.for = 'details-completed';
    completedLabel.textContent = 'Completed';
    const completedInput = document.createElement('input');
    completedInput.type = 'checkbox';
    completedInput.id = 'details-completed';
    completedInput.checked = todo.completed;
    modalContent.appendChild(completedLabel);
    modalContent.appendChild(completedInput);

    const updateButton = document.createElement('button');
    updateButton.type = 'submit';
    updateButton.textContent = 'Update Todo';
    updateButton.classList.add('button', 'is-primary');
    updateButton.addEventListener('click', (e) => {
        e.preventDefault();
        todo.title = detailsForm.elements['details-title'].value;
        todo.description = detailsForm.elements['details-description'].value;
        todo.dueDate = detailsForm.elements['details-due-date'].value;
        todo.priority = detailsForm.elements['details-priority'].value;
        todo.completed = detailsForm.elements['details-completed'].checked;
        renderMain();
    })
    modalContent.appendChild(updateButton);

    const closeButton = document.createElement('button');
    closeButton.classList.add('modal-close', 'is-large');
    closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        detailsElement.classList.remove('is-active');
    })
    detailsForm.appendChild(closeButton);
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