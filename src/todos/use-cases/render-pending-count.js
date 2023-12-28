import todoStore, { Filters } from "../../store/todo.store";

export const renderPendingCount = (htmlElementID) => {
    if(!htmlElementID) throw new Error('HTML element is required');
    const htmlElement = document.querySelector(htmlElementID);
    if(!htmlElement) throw new Error(`The HTML element ${htmlElementID} not found`);

    htmlElement.innerText = todoStore.getTodos(Filters.Pending).length;
}