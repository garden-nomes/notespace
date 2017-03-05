import {
  ADD_CONNECTION,
  DELETE_CONNECTION
} from './actions';

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case ADD_CONNECTION:
    return [
      {
        id: state.reduce((maxId, note) => Math.max(note.id, maxId), -1) + 1,
        from: action.from,
        to: action.to
      },
      ...state
    ];
  case DELETE_CONNECTION:
    return state.filter(connection => connection.id !== action.id);
  default:
    return state;
  }
}
