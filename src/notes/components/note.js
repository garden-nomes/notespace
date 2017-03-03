import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

const Note = ({ note, connected, deleteConnectionByNoteId }) => (
  <div className="note">
    <ReactMarkdown source={note.text} />

    <h5>Connected notes:</h5>
    <ul>
      {connected.map(note =>
        <li key={note.id}>
          {note.text}
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
  connected: PropTypes.array.isRequired
};

export default Note;
