import React, { Component, PropTypes } from 'react';

import DoneButton from './done-button';
import EditButton from './edit-button';

class EditToggle extends Component {
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
    let { onToggleEdit } = this.props;

    if (e.code === 'Space' && e.shiftKey) {
      e.preventDefault();
      onToggleEdit.call();
    }
  }

  render() {
    const { editing, onToggleEdit } = this.props;

    return (
      editing?
        <DoneButton onClick={onToggleEdit} />
      :
        <EditButton onClick={onToggleEdit} />
    );
  }
}

EditToggle.propTypes = {
  editing: PropTypes.bool.isRequired,
  onToggleEdit: PropTypes.func
};

export default EditToggle;
