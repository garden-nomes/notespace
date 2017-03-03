import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Panel from './panel';
import { Graph, addNote, editNote } from '../../notes';
import { addConnection } from '../../connections';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedNote: null };
    this.selectNote = this.selectNote.bind(this);
  }

  selectNote(id) {
    this.setState({ selectedNote: id });
  }

  render() {
    const { selectNote } = this;
    const { notes, connections, addNote, editNote, addConnection } = this.props;
    const { selectedNote } = this.state;

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
          <Panel note={note} connected={connected} editNote={editNote} />
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
  addConnection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notes: state.notes,
  connections: state.connections
});

export default connect(
  mapStateToProps,
  { addNote, addConnection, editNote }
)(App);
