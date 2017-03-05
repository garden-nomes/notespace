import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { Note, Form, editNote, deleteNote } from '../../notes';
import { deleteConnection } from '../../connections';

import Toolbar from './toolbar/';

class Panel extends Component {
  constructor(props) {
    super(props);
    const { note } = props;
    this.state = { editing: !!note.new };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteConnectionByNoteId = this.deleteConnectionByNoteId.bind(this);
  }

  toggleEdit() {
    this.setState(prevState => ({
      editing: !prevState.editing
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
    const { editing } = this.state;
    const { note, connected, editNote, deleteNote, selectNote } = this.props;

    const confirmDelete = () => (
      window.confirm('Are you sure you want do delete this note?') ?
      deleteNote(note.id) :
      null
    );

    return (
      <div id="panel" className="container">
        <Toolbar
          editing={editing}
          onClose={() => selectNote(null)}
          onToggleEdit={this.toggleEdit}
          onDelete={() => confirmDelete()}
        />

        {editing ?
          <Form note={note} editNote={editNote} />
        :
          <Note
            note={note}
            connected={connected}
            deleteConnectionByNoteId={this.deleteConnectionByNoteId}
            selectNote={selectNote}
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
  deleteConnection: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired
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
  selectNote: ownProps.selectNote,
  ...dispatchProps
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Panel);
