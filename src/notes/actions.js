import {
  ADD_NOTE,
  // DELETE_NOTE,
  // EDIT_NOTE,
  // ADD_CONNECTION,
  // DELETE_CONNECTION
} from './constants/actionTypes';

const initialState = {
  notes: [
    { id: 0, text: 'Note graph!' },
    { id: 1, text: 'Double click' },
    { id: 2, text: 'to create a note!' },
    { id: 3, text: 'Click to select a note' },
    { id: 4, text: 'and shift-click another' },
    { id: 5, text: 'to connect them!' }
  ],
  connections: [
    { from: 1, to: 0 },
    { from: 1, to: 2 },
    { from: 2, to: 0 },
    { from: 3, to: 0 },
    { from: 3, to: 4 },
    { from: 4, to: 5 }
  ]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case ADD_NOTE:
    return Object.assign({}, state, {
      notes: [
        state.notes,
        ...action.note,
      ]
    });
  default:
    return state;
  }
}
