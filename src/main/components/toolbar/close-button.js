import React, { PropTypes } from 'react';

const CloseButton = ({ onClick }) => (
  <button className="close" type="button" onClick={onClick}>
    &times;
  </button>
);

CloseButton.propTypes = {
  onClick: PropTypes.func
};

export default CloseButton;
