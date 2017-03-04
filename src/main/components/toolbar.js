import React, { PropTypes } from 'react';

import CloseButton from './close-button';
import EditButton from './edit-button';
import DoneButton from './done-button';
import DeleteButton from './delete-button';

const Toolbar = ({ editing, onClose, onToggleEdit, onDelete }) => (
  <div className="row toolbar">
    <div className="toolbar-left col-sm-4">
      <CloseButton onClick={onClose} />
    </div>
    <div className="toolbar-middle col-sm-4">
      {editing ?
        <DoneButton onClick={onToggleEdit} />
      :
        <EditButton onClick={onToggleEdit} />
      }
    </div>
    <div className="toolbar-right col-sm-4">
      <DeleteButton onClick={onDelete} />
    </div>
  </div>
);

Toolbar.propTypes = {
  editing: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default Toolbar;
