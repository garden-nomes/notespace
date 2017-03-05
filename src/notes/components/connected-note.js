import React, { PropTypes } from 'react';

import { formatTitle } from '../model';

const ConnectedNote = ({ note, onSelect, onDelete }) => (
  <li className="connected-note">
    <a href="#" onClick={onSelect}>
      {formatTitle(note)}
    </a>
    &nbsp;
    <a className="text-danger small" href="#" onClick={onDelete}>
      <i className="fa fa-trash"></i>
    </a>
  </li>
);

ConnectedNote.propTypes = {
  note: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func
};

export default ConnectedNote;
