 export const ADD_CONNECTION = 'ADD_CONNECTION';
 export const DELETE_CONNECTION = 'DELETE_CONNECTION';

 export const addConnection = (from, to) => ({
   type: ADD_CONNECTION,
   from,
   to
 });

 export const deleteConnection = (id) => ({
   type: DELETE_CONNECTION,
   id
 });
