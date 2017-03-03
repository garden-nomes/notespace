import React, { PropTypes, Component } from 'react';
import { Note, Form } from '../../notes';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState(prevState => ({
      edit: !prevState.edit
    }));
  }

  render() {
    const { edit } = this.state;
    const { note, connected, editNote } = this.props;

    return (
      <div id="panel" className="container">
        <div>
          <a href="#" onClick={this.toggleEdit}>
            {edit ? 'done' : 'edit'}
          </a>
        </div>

        {edit ?
          <Form note={note} editNote={editNote} />
        :
          <Note note={note} connected={connected} />
        }
      </div>
    );
  }
}

Panel.propTypes = {
  note: PropTypes.object.isRequired,
  connected: PropTypes.array.isRequired,
  editNote: PropTypes.func.isRequired
};

export default Panel;
