import {
  ADD_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
} from './actions';

const initialState = [
  { id: 0, text: 'Note graph!' },
  { id: 1, text: 'Double click' },
  { id: 2, text: 'to create a note!' },
  { id: 3, text: 'Click to select a note' },
  { id: 4, text: 'and shift-click another' },
  { id: 5, text: 'to connect them!' }
];

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case ADD_NOTE:
    return [
      {
        id: state.reduce((maxId, note) => Math.max(note.id, maxId), -1) + 1,
        text: 'New note!'
      },
      ...state,
    ];
  case DELETE_NOTE:
    return state.filter(note => note.id !== action.id);
  case EDIT_NOTE:
    return state.map(note =>
      note.id === action.id ? { ...note, text: action.text } : note
    );
  default:
    return state;
  }
}
