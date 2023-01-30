const validationMessages = {
    title: {
        empty: "Title must not be empty",
        length: "Title must be greater than or equal to 10"
    },
    duration: {
        empty: "Duration field must not be empty",
        length: "Duration length must be between 6 and 10"
    },
    difficulty: {
        required: "Choosing difficulty level is required"
    },
    description: {
        empty: "Description field must not be empty",
        length: "Description field must be greater than or equal to 70"
    }
};

export const formElements = {
    todoTitle: "#todoTitle",
    todoDuration: "#todoDuration",
    todoDifficulty: "#todoDifficulty",
    todoDescription: "#todoDescription"
};

export class FormValidator {
    static renderFormMessage(field, text, color) {
        const formField = document.querySelector(`.${field}`);
        formField.textContent = text;
        formField.style.color = color;
    }

    static validateTodoTitle() {
        const todoTitle = document.querySelector(formElements.todoTitle).value;

        if (todoTitle.length === 0) {
            FormValidator.renderFormMessage('title-text', validationMessages.title.empty, 'red');
            return false;
        } else if (todoTitle.length < 10) {
            FormValidator.renderFormMessage('title-text', validationMessages.title.length, 'red');
            return false;
        } else {
            FormValidator.renderFormMessage('title-text', 'title looks good', 'green');
            return true;
        }
    }

    static validateTodoDuration() {
        const todoDuration = document.querySelector(formElements.todoDuration).value;

        if (todoDuration.length === 0) {
            FormValidator.renderFormMessage('duration-text', validationMessages.duration.empty, 'red');
            return false;
        } else if (todoDuration.length < 6 || todoDuration.length > 10) {
            FormValidator.renderFormMessage('duration-text', validationMessages.duration.length, 'red');
            return false;
        } else {
            FormValidator.renderFormMessage('duration-text', 'duration field looks valid', 'green');
            return true;
        }
    }

    static validateTodoDifficulty() {
        const todoDifficulty = document.querySelector(formElements.todoDifficulty).value;

        if (todoDifficulty !== 'Choose Todo Difficulty' && todoDifficulty) {
            FormValidator.renderFormMessage('difficulty-text', validationMessages.difficulty.required, 'green');
            return true;
        } else {
            FormValidator.renderFormMessage('difficulty-text', 'choosing difficulty level is required', 'red');
            return false;
        }
    }

    static validateTodoDescription() {
        const todoDescription = document.querySelector(formElements.todoDescription).value;

        if (todoDescription.length === 0) {
            FormValidator.renderFormMessage('description-text', validationMessages.description.empty, 'red');
            return false;
        } else if (todoDescription.length < 70) {
            FormValidator.renderFormMessage('description-text', validationMessages.description.length, 'red');
        } else {
            FormValidator.renderFormMessage('description-text', 'description looks legit', 'green');
            return true;
        }
    }
}

export class Todos {
    constructor() {
        this.todos = [];

        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todos = [...savedTodos];
    }

    addTodo(todo) {
        this.todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getTodos() {
        return this.todos;
    }

    static removeTodo(id) {
        const todos = new Todos();
        const filteredTodos = todos.getTodos().filter(todo => todo.id != id);
        localStorage.setItem('todos', JSON.stringify(filteredTodos));
    }

    static markTodo(id) {
        const todos = new Todos();
        const todo = todos.getTodos().find(todo => todo.id === id);
        todo.completed = true;
        localStorage.setItem('todos', JSON.stringify(todos.getTodos()));
    }
}

export class Todo {
    constructor(title, duration, difficulty, description) {
        this.id = Todo.generateRandomUnicId();
        this.title = title;
        this.duration = duration;
        this.difficulty = difficulty;
        this.description = description;
        this.completed = false;
    }

    static generateRandomUnicId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

export class UI {
    static showMessage(msg, text, style, display) {
        const message = document.querySelector(`.${msg}`);

        message.textContent = text;
        message.classList.add(style);
        message.style.display = display;

        setTimeout(() => {
            message.textContent = '';
            message.classList.add('alert-dark');
            message.style.display = 'none';
        }, 3000);
    }

    static renderTodos() {
        const todos = new Todos();
        todos.getTodos().forEach(todo => {
            let difficultyColor;

            if (todo.difficulty === 'easy') {
                difficultyColor = '#79be8f';
            } else if (todo.difficulty === 'medium') {
                difficultyColor = '#c3bc7d';
            } else {
                difficultyColor = '#bd0f3b';
            }

            const todoCard = `
                <h5 style="color: ${difficultyColor}" class="card-header">${todo.difficulty}</h5>
                <div class="card-body ${todo.completed ? 'bg-success-subtle' : ''}">
                    <h5 class="card-title">${todo.title}</h5>
                    <p class="card-text">${todo.description}</p>
                    <a href="#" data-index=${todo.id} class="btn btn-danger delete-btn">Delete</a>
                    <a href="#" data-index=${todo.id} class="btn btn-primary complete-btn ${todo.completed ? 'btn-success' : ''}">${todo.completed ? 'Completed' : 'Complete'}</a>
                </div>
            `;

            const todoContainer = document.createElement('div');
            todoContainer.classList.add('card', 'm-3');
            todoContainer.innerHTML = todoCard;

            document.querySelector('.todos').appendChild(todoContainer);
        });
    }

    static deleteTodo() {
        document.querySelector('.todos').addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                e.target.parentElement.parentElement.remove();
                const todoId = e.target.dataset.index;
                Todos.removeTodo(todoId);
            }
        });
    }

    static completeTodo() {
        document.querySelector('.todos').addEventListener('click', (e) => {
            if (e.target.classList.contains('complete-btn')) {
                e.target.textContent = 'Completed';
                e.target.classList.remove('btn-primary');
                e.target.classList.add('btn-success');
                e.target.disabled = true;

                const todoId = e.target.dataset.index;
                Todos.markTodo(todoId);
            }
        });
    }
}