import React, { PropTypes, Component } from 'react';
import { DataSet, Network } from 'vis';

const COLORS = {
  background: '#696D7D',
  main: '#81C3D7',
  highlight: '#D9DCD6'
};

const OPTIONS = {
  nodes: {
    borderWidth: 0,
    borderWidthSelected: 0,
    color: {
      background: COLORS.main,
      highlight: { background: COLORS.highlight }
    },
    font: { color: COLORS.background }
  },
  edges: {
    color: {
      color: COLORS.main,
      highlight: COLORS.highlight
    }
  }
};

class Graph extends Component {
  constructor(props) {
    super(props);
    this.identifier = 'note-graph';

    this.initGraph = this.initGraph.bind(this);
    this.initData = this.initData.bind(this);
    this.handleSelectNode = this.handleSelectNode.bind(this);
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

    // update doesn't remove items
    this.nodes.get().forEach(graphNode => {
      if (nodes.find(node => node.id === graphNode.id) === undefined) {
        this.nodes.remove(graphNode.id);
      }
    });

    this.edges.get().forEach(graphEdge => {
      if (edges.find(edge => edge.id === graphEdge.id) === undefined) {
        this.edges.remove(graphEdge.id);
      }
    });
  }

  handleSelectNode(e) {
    const { selectNote } = this.props;
    const id = e.nodes[0];

    selectNote(id);
  }

  handleDeselectNode(e) {
    const { selectNote } = this.props;
    selectNote(null);

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

    this.network.on('selectNode', this.handleSelectNode);
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
  selectNote: PropTypes.func.isRequired,
  addConnection: PropTypes.func.isRequired
};

export default Graph;
