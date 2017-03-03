import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

const Note = ({ note }) => (
  <div className="note">
    <ReactMarkdown source={note.text} />
  </div>
);

Note.propTypes = {
  note: PropTypes.object.isRequired
};

export default Note;
