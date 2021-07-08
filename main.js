import { actions, events } from './module.js';

document.addEventListener('DOMContentLoaded', function () {
  events.addMemo();
  actions.checkLocalStorage();
});
