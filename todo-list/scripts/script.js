// Import required classes from app.js
import {
    formElements
} from './app.js';
import {
    FormValidator
} from './app.js';
import {
    Todos
} from './app.js';
import {
    Todo
} from './app.js';
import {
    UI
} from './app.js';

// Class to handle todo form logic
class TodoForm {
    constructor() {
        // Get todo form element
        this.form = document.getElementById('todo-form');
        // Create instance of Todos
        this.todos = new Todos();
        // Add submit event to form
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Call submitTodo method on form submit
            this.submitTodo();
        });
    }

    // Method to submit todo
    submitTodo() {
        // Get values from form elements
        const todoTitle = document.querySelector(formElements.todoTitle).value;
        const todoDuration = document.querySelector(formElements.todoDuration).value;
        const todoDifficulty = document.querySelector(formElements.todoDifficulty).value;
        const todoDescription = document.querySelector(formElements.todoDescription).value;

        // Validate form inputs
        const isTitleValid = FormValidator.validateTodoTitle(todoTitle);
        const isDurationValid = FormValidator.validateTodoDuration(todoDuration);
        const isDifficultyValid = FormValidator.validateTodoDifficulty(todoDifficulty);
        const isDescriptionValid = FormValidator.validateTodoDescription(todoDescription);

        // If all inputs are valid
        if (isTitleValid && isDurationValid && isDifficultyValid && isDescriptionValid) {
            // Create new Todo instance
            const todo = new Todo(todoTitle, todoDuration, todoDifficulty, todoDescription);
            // Add todo after 1.5s delay
            setTimeout(() => {
                this.todos.addTodo(todo);
                // Reset form
                this.resetForm();
                // Hide modal
                $('#todoModal').modal('hide');
                // Show success message
                UI.showMessage('msg', 'todo has been added successfuly', 'alert-success', 'block');
                // Reload page
                window.location.reload();
            }, 1500);
        }
    }

    // Method to reset form
    resetForm() {
        this.form.reset();
        document.querySelector('.title-text').textContent = '';
        document.querySelector('.duration-text').textContent = '';
        document.querySelector('.difficulty-text').textContent = '';
        document.querySelector('.description-text').textContent = '';
    }
}

// Create instance of TodoForm
new TodoForm();

// Wait for DOM to load then render todos
document.addEventListener('DOMContentLoaded', () => {
    UI.renderTodos();
    // Handle delation of todos
    UI.deleteTodo();
    // Handle completion of todos
    UI.completeTodo();
});