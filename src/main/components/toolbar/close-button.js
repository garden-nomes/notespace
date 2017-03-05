import React, { Component, PropTypes } from 'react';

class CloseButton extends Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(e) {
    const { onClick } = this.props;

    if (e.code === 'Escape') {
      e.preventDefault();
      onClick.call();
    }
  }

  render() {
    const { onClick } = this.props;

    return (
      <button className="close" type="button" onClick={onClick}>
        &times;
      </button>
    );
  }
}

CloseButton.propTypes = {
  onClick: PropTypes.func
};

export default CloseButton;
