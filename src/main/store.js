import { createStore } from 'redux';

import reducer from './reducer';

// load state from local storage
const persistedState = localStorage.getItem('notespaceState') ?
  JSON.parse(localStorage.getItem('notespaceState')) :
  {};

const store = createStore(reducer, persistedState);

// save state to local storage
store.subscribe(() =>{
  const state = store.getState();
  localStorage.setItem('notespaceState', JSON.stringify(state));
});

export default store;
