import data from './data.json';
import { addItem, deleteItem } from '../indexdb';



export const addData = () => data.forEach((item) => addItem(item));
export const delData = () => data.forEach((item) => deleteItem(item.id));