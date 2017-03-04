import React, { PropTypes } from 'react';

const EditButton = ({ onClick }) => (
  <button className="btn btn-outline-primary" type="button" onClick={onClick}>
    edit&nbsp;
    <i className="fa fa-pencil"></i>
  </button>
);

EditButton.propTypes = {
  onClick: PropTypes.func
};

export default EditButton;
