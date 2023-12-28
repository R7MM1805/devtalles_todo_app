import { createTodoHTML } from ".";

let elementHTML;

export const renderTodos  = (htmlElement, todos = []) => {
    if(!elementHTML) elementHTML = document.querySelector(htmlElement);
    if(!elementHTML) throw new Error(`Element HTML ${htmlElement} not found`);
    elementHTML.innerHTML = '';
    todos.forEach(todo => {
        elementHTML.append(createTodoHTML(todo));
    });
}