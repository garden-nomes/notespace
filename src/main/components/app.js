import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from './panel';
import Graph from './graph';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedNote: null };
    this.selectNote = this.selectNote.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const selected = nextProps.notes.find(
      note => note.id === this.state.selectedNote
    );

    if (selected === undefined) {
      this.selectNote(null);
    }
  }


  selectNote(id) {
    this.setState({ selectedNote: id });
  }

  render() {
    const { selectNote } = this;
    const { selectedNote } = this.state;

    return (
      <div className="app">
        {selectedNote !== null && <Panel noteId={selectedNote} /> }
        <Graph selectNote={selectNote} />
      </div>
    );
  }
}

const maptStateToProps = (state) => ({
  notes: state.notes
});

export default connect(maptStateToProps)(App);
