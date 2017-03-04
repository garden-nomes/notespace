import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

import { formatTitle } from '../model';

const Note = ({ note, connected, deleteConnectionByNoteId, selectNote }) => (
  <div className="note">
    <ReactMarkdown source={note.text} />

    <hr />
    <h6>Connected notes:</h6>
    <ul>
      {connected.map(note =>
        <li key={note.id}>
          <a href="#" onClick={() => selectNote(note.id)}>
            {formatTitle(note)}
          </a>

          &nbsp;

          <a
            className="small"
            href="#"
            onClick={() => deleteConnectionByNoteId(note.id)}>
            delete
          </a>
        </li>
      )}
    </ul>
  </div>
);

Note.propTypes = {
  note: PropTypes.object.isRequired,
  connected: PropTypes.array.isRequired,
  deleteConnectionByNoteId: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired
};

export default Note;
