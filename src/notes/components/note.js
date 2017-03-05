import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

import ConnectedNote from './connected-note';

const Note = ({ note, connected, deleteConnectionByNoteId, selectNote }) => (
  <div className="note">
    <ReactMarkdown source={note.text} />

    <hr />
    <h6>Connected notes:</h6>
    <ul>
      {connected.map(note =>
        <ConnectedNote
          key={note.id}
          note={note}
          onSelect={() => selectNote(note.id)}
          onDelete={() => deleteConnectionByNoteId(note.id)}
        />
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
