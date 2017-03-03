import React, { PropTypes, Component } from 'react';
import { DataSet, Network } from 'vis';

const OPTIONS = {
  nodes: {
    borderWidth: 0,
    borderWidthSelected: 0,
    color: {
      background: '#eceeef',
      highlight: { background: '#EAEFBD' }
    },
    font: { color: '#673C4F' }
  },
  edges: {
    color: {
      color: '#eceeef',
      highlight: '#EAEFBD'
    }
  }
};

class Graph extends Component {
  constructor(props) {
    super(props);
    this.identifier = 'note-graph';

    this.initGraph = this.initGraph.bind(this);
    this.initData = this.initData.bind(this);
    this.handleDeselectNode = this.handleDeselectNode.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  componentDidMount() {
    this.initData();
    this.initGraph();
  }

  componentDidUpdate() {
    const { notes, connections } = this.props;
    const nodes = notes.map(note => ({ id: note.id, label: note.text }));
    const edges = connections;

    this.nodes.update(nodes);
    this.edges.update(edges);
  }

  handleDeselectNode(e) {
    if (e.event.srcEvent.shiftKey &&
        e.previousSelection.nodes.length > 0 &&
        e.nodes.length > 0) {

      const { addConnection } = this.props;
      const fromId = e.nodes[0];
      const toId = e.previousSelection.nodes[0];
      addConnection(fromId, toId);
      this.network.selectNodes([toId]);
    }
  }

  handleDoubleClick() {
    const { addNote } = this.props;
    addNote();
  }

  initData () {
    const { notes, connections } = this.props;
    const nodes = notes.map(note => ({ id: note.id, label: note.text }));
    const edges = connections;

    this.nodes = new DataSet(nodes);
    this.edges = new DataSet(edges);
  }

  initGraph() {
    let { nodes, edges } = this;

    const container = document.getElementById(this.identifier);
    const data = { nodes, edges };
    const options = OPTIONS;
    this.network = new Network(container, data, options);

    this.network.on('deselectNode', this.handleDeselectNode);
    this.network.on('doubleClick', this.handleDoubleClick);
  }

  render() {
    return <div id={this.identifier} />;
  }
}

Graph.propTypes = {
  notes: PropTypes.array,
  connections: PropTypes.array,
  addNote: PropTypes.func.isRequired,
  addConnection: PropTypes.func.isRequired
};

export default Graph;
