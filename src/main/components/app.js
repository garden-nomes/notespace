import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { Graph } from '../../notes';

class App extends Component {
  render() {
    const { notes, connections } = this.props;

    return (
      <Graph
        notes={notes}
        connections={connections}
      />
    );
  }
}

App.propTypes = {
  notes: PropTypes.array,
  connections: PropTypes.array
};

const mapStateToProps = state => ({
  notes: state.notes,
  connections: state.connections
});

export default connect(mapStateToProps)(App);
