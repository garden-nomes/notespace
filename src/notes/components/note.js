import React, { PropTypes } from 'react';
import Markdown from 'react-markdown';

import ConnectedNote from './connected-note';
import CodeBlock from '../../main/components/code-block';

const Note = ({ note, connected, deleteConnectionByNoteId, selectNote }) => (
  <div className="note">
    <Markdown className="note-text" source={note.text}
      renderers={Object.assign({}, Markdown.renderers, {
        CodeBlock: CodeBlock
      })}
    />

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
