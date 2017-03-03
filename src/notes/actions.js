 export const ADD_NOTE = 'ADD_NOTE';
 export const DELETE_NOTE = 'DELETE_NOTE';
 export const EDIT_NOTE = 'EDIT_NOTE';

 export const addNote = () => ({
   type: ADD_NOTE,
   note: { text: 'New note!' }
 });

 export const deleteNote = (id) => ({
   type: ADD_NOTE,
   id
 });

 export const editNote = (id, text) => ({
   type: EDIT_NOTE,
   id,
   text
 });
