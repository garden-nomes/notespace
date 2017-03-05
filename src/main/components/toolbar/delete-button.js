import React, { Component, PropTypes } from 'react';

class DeleteButton extends Component {
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

    if (e.code === 'Backspace' && e.shiftKey) {
      e.preventDefault();
      onClick.call();
    }
  }

  render() {
    const { onClick } = this.props;

    return (
      <button className="btn btn-outline-danger btn-sm" type="button" onClick={onClick}>
        <i className="fa fa-trash"></i>
      </button>
    );
  }
}

DeleteButton.propTypes = {
  onClick: PropTypes.func
};

export default DeleteButton;
