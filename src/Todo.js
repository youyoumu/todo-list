class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
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

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(newDueDate) {
        this._dueDate = newDueDate;
    }

    get priority() {
        return this._priority;
    }

    set priority(newPriority) {
        this._priority = newPriority;
    }

    get completed() {
        return this._completed;
    }

    set completed(newCompleted) {
        this._completed = newCompleted;
    }
}

export default Todo;