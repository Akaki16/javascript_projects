import { formElements } from './app.js';
import { FormValidator } from './app.js';
import { Todos } from './app.js';
import { Todo } from './app.js';
import { UI } from './app.js';

class TodoForm {
    constructor() {
        this.form = document.getElementById('todo-form');
        this.todos = new Todos();

        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.submitTodo();
        });
    }

    submitTodo() {
        const todoTitle = document.querySelector(formElements.todoTitle).value;
        const todoDuration = document.querySelector(formElements.todoDuration).value;
        const todoDifficulty = document.querySelector(formElements.todoDifficulty).value;
        const todoDescription = document.querySelector(formElements.todoDescription).value;

        const isTitleValid = FormValidator.validateTodoTitle(todoTitle);
        const isDurationValid = FormValidator.validateTodoDuration(todoDuration);
        const isDifficultyValid = FormValidator.validateTodoDifficulty(todoDifficulty);
        const isDescriptionValid = FormValidator.validateTodoDescription(todoDescription);

        if (isTitleValid && isDurationValid && isDifficultyValid && isDescriptionValid) {
            const todo = new Todo(todoTitle, todoDuration, todoDifficulty, todoDescription);

            setTimeout(() => {
                this.todos.addTodo(todo);

                this.resetForm();

                $('#todoModal').modal('hide');

                UI.showMessage('msg', 'todo has been added successfuly', 'alert-success', 'block');

                window.location.reload();
            }, 1500);
        }
    }

    resetForm() {
        this.form.reset();
        document.querySelector('.title-text').textContent = '';
        document.querySelector('.duration-text').textContent = '';
        document.querySelector('.difficulty-text').textContent = '';
        document.querySelector('.description-text').textContent = '';
    }
}

const todoForm = new TodoForm();

todoForm.submitTodo();

document.addEventListener('DOMContentLoaded', () => {
    UI.renderTodos();
});

UI.deleteTodo();