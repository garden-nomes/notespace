import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { Graph, addNote } from '../../notes';
import { addConnection } from '../../connections';

class App extends Component {
  render() {
    const { notes, connections, addNote, addConnection } = this.props;

    return (
      <Graph
        notes={notes}
        connections={connections}
        addNote={addNote}
        addConnection={addConnection}
      />
    );
  }
}

App.propTypes = {
  notes: PropTypes.array.isRequired,
  connections: PropTypes.array.isRequired,
  addNote: PropTypes.func.isRequired,
  addConnection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notes: state.notes,
  connections: state.connections
});

export default connect(
  mapStateToProps,
  { addNote, addConnection }
)(App);
