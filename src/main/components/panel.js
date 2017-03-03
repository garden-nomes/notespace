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

  deleteConnectionByNoteId(noteId) {
    const { connections, deleteConnection } = this.props;
    const connection = connections.find(connection =>
      connection.from === noteId || connection.to === noteId
    );

    deleteConnection(connection.id);
  }

  render() {
    const { edit } = this.state;
    const { note, connected, editNote, deleteNote } = this.props;

    return (
      <div id="panel" className="container">
        <div>
          <a href="#" onClick={this.toggleEdit}>
            {edit ? 'done' : 'edit'}
          </a>
          &nbsp;
          <a className="small" href="#" onClick={() => deleteNote(note.id)}>
            delete
          </a>
        </div>

        {edit ?
          <Form note={note} editNote={editNote} />
        :
          <Note
            note={note}
            connected={connected}
            deleteConnection={deleteConnection}
          />
        }
      </div>
    );
  }
}

Panel.propTypes = {
  note: PropTypes.object.isRequired,
  connected: PropTypes.array.isRequired,
  connections: PropTypes.array.isRequired,
  editNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  deleteConnection: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  notes: state.notes,
  connections: state.connections
});

const mapDispatchToProps = {
  editNote,
  deleteNote,
  deleteConnection
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  note: stateProps.notes.find(note => note.id === ownProps.noteId),
  connections: stateProps.connections.filter(connection =>
    connection.from === ownProps.noteId || connection.to === ownProps.noteId
  ),
  connected: stateProps.connections.map(connection => {
    if (connection.from === ownProps.noteId) {
      return stateProps.notes.find(note => note.id === connection.to);
    } else if (connection.to === ownProps.noteId) {
      return stateProps.notes.find(note => note.id === connection.from);
    } else {
      return null;
    }
  }).filter(connection =>
    connection !== null
  ),
  ...dispatchProps
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Panel);
