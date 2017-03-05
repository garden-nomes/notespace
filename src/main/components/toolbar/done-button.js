import React, { PropTypes } from 'react';

const DoneButton = ({ onClick }) => (
  <button className="btn btn-outline-info" type="button" onClick={onClick}>
    done&nbsp;
    <i className="fa fa-check"></i>
  </button>
);

DoneButton.propTypes = {
  onClick: PropTypes.func
};

export default DoneButton;
