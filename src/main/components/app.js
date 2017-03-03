import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Panel from './panel';
import { Graph, addNote, editNote, deleteNote } from '../../notes';
import { addConnection, deleteConnection } from '../../connections';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedNote: null };
    this.selectNote = this.selectNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  selectNote(id) {
    this.setState({ selectedNote: id });
  }

  componentWillReceiveProps(nextProps) {
    const { notes } = nextProps;
    const { selectedNote } = this.state;

    if (notes.find(note => note.id === selectedNote) === undefined) {
      this.setState({ selectedNote: null });
    }
  }

  deleteNote(id) {
    const { connections, deleteNote, deleteConnection } = this.props;

    deleteNote(id);
    connections.filter(connection =>
      connection.from === id || connection.to === id
    ).forEach(connection => deleteConnection(connection.id));
  }

  render() {
    const { selectNote } = this;
    const { selectedNote } = this.state;
    const {
      notes,
      connections,
      addNote,
      editNote,
      addConnection,
      deleteConnection
    } = this.props;

    const note = selectedNote !== null ?
      notes.find(note => note.id === selectedNote) :
      null;

    const connected = selectedNote !== null ?
      connections.map(connection => {
        if (connection.from === selectedNote) {
          return notes.find(note => note.id === connection.to);
        } else if (connection.to === selectedNote) {
          return notes.find(note => note.id === connection.from);
        } else {
          return null;
        }
      }).filter(note => note !== null) :
      null;

    return (
      <div className="app">
        {selectedNote !== null &&
          <Panel
            note={note}
            connected={connected}
            editNote={editNote}
            deleteNote={this.deleteNote}
            deleteConnection={deleteConnection}
          />
        }

        <Graph
          notes={notes}
          connections={connections}
          addNote={addNote}
          selectNote={selectNote}
          addConnection={addConnection}
        />
      </div>
    );
  }
}

App.propTypes = {
  notes: PropTypes.array.isRequired,
  connections: PropTypes.array.isRequired,
  addNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  addConnection: PropTypes.func.isRequired,
  deleteConnection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notes: state.notes,
  connections: state.connections
});

export default connect(
  mapStateToProps,
  {
    addNote,
    editNote,
    deleteNote,
    addConnection,
    deleteConnection
  }
)(App);
