import './style.css'
import {app} from './src/todos/app';
import initStore from './src/store/todo.store';


initStore.initStore();
app('#app');
