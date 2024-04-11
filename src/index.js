import Todo from './Todo.js';
import Project from './Project.js';

const projects = [];

const newProjectForm = document.getElementById('new-project-form');
const projectsElement = document.getElementById('projects');

function renderProjects() {
    projectsElement.innerHTML = '';
    projects.forEach((project) => {
        const projectElement = document.createElement('div');
        projectElement.textContent = project.title;
        projectsElement.appendChild(projectElement);
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