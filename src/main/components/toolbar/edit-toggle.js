import React, { PropTypes } from 'react';

import DoneButton from './done-button';
import EditButton from './edit-button';

const EditToggle = ({ editing, toggleEdit }) => (
  editing?
    <DoneButton onClick={toggleEdit} />
  :
    <EditButton onClick={toggleEdit} />
);

EditToggle.propTypes = {
  editing: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func
};

export default EditToggle;
