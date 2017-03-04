import React, { PropTypes } from 'react';

const DeleteButton = ({ onClick }) => (
  <button className="btn btn-outline-danger btn-sm" type="button" onClick={onClick}>
    <i className="fa fa-trash"></i>
  </button>
);

DeleteButton.propTypes = {
  onClick: PropTypes.func
};

export default DeleteButton;
