import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [],
    filter: Filters.All
}

const initStore = () => {
    loadStore();
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;
    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveLocalStore = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter = Filters.All) => {
    switch(filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid`);
    }
}

const addTodo = (description) => {
    if(!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));
    saveLocalStore();
}

const toggleTodo = (todoID) => {
    for (const todo of state.todos) {
        if(todo.id === todoID){
            todo.done = !todo.done;
            saveLocalStore();
            break;
        }
    }
}

const deleteTodo = (todoID) => {
    state.todos = state.todos.filter(todo => todo.id !== todoID);
    saveLocalStore();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveLocalStore();
}

const setFilter = (newFilter) => {
    state.filter = newFilter;
    saveLocalStore();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore,
    loadStore,
    saveLocalStore,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter
}