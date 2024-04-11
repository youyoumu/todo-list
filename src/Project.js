class Project {
    constructor(title, description) {
        this._title = title;
        this._description = description;
        this._todos = [];
    }

    get title() {
        return this._title;
    }

    set title(newTitle) {
        this._title = newTitle;
    }

    get description() {
        return this._description;
    }

    set description(newDescription) {
        this._description = newDescription;
    }

    get todos() {
        return this._todos;
    }

    addTodo(todo) {
        this._todos.push(todo);
    }

    removeTodo(index) {
        this._todos.splice(index, 1);
    }
}