import html from './app.html?raw'

/**
 * 
 * @param {String} elementID 
 */
export const app = (elementID) => {
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementID).append(app);
    })();
}