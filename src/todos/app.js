import html from './app.html?raw'
import { renderTodos } from './use-cases';
import todoStore, { Filters } from '../store/todo.store';
import { renderPendingCount } from './use-cases/render-pending-count';

const HtmlElements = {
    todoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    clearCompleted: '.clear-completed',
    liFilters: '.filter',
    pendingCount: '#pending-count'
}

export const app = (elementID) => {
    const initApp = () => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementID).append(app);
    }
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(HtmlElements.todoList, todos);
        renderPendingCount(HtmlElements.pendingCount);
    }
    (() => {
        initApp();
        displayTodos();
    })();

    const addTodoInput = document.querySelector(HtmlElements.newTodoInput);
    const todoListUL = document.querySelector(HtmlElements.todoList);
    const clearCompleted = document.querySelector(HtmlElements.clearCompleted);
    const liFilters = document.querySelectorAll(HtmlElements.liFilters);

    addTodoInput.addEventListener('keyup', (event) => {
        const value = event.target.value;
        if(event.keyCode === 13 && value.trim() !== '') {
            todoStore.addTodo(value);
            displayTodos();
            event.target.value = '';
        }
    });
    todoListUL.addEventListener('click', (event) => {
        todoStore.toggleTodo(event.target.closest('[data-id]').getAttribute('data-id'));
        displayTodos();
    });
    todoListUL.addEventListener('click', (event) => {
        const target = event.target;
        if(target.className === 'destroy'){
            todoStore.deleteTodo(target.closest('[data-id]').getAttribute('data-id'));
            displayTodos();
        }
    });
    clearCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });
    liFilters.forEach(element => {
        element.addEventListener('click', (event) =>{
            removeSelectedClass();
            event.target.classList.add('selected');
            setNewFilter(event.target.id);
            displayTodos();
        });
    });

    const removeSelectedClass = () => {
        liFilters.forEach(element => {
            element.classList.remove('selected');
        });
    }
    const setNewFilter = (filterID) => {
        switch (filterID) {
            case 'FilterAll':
                todoStore.setFilter(Filters.All);
                break;
            case 'FilterPending':
                todoStore.setFilter(Filters.Pending);
                break;
            case 'FilterCompleted':
                todoStore.setFilter(Filters.Completed);
        }
    }
}