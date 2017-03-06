import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { DataSet, Network } from 'vis';

import { addNote, formatTitle } from '../../notes';
import { addConnection, deleteConnection } from '../../connections';

const COLORS = {
  background: '#fdf6e3',
  main: '#586e75'
};

const OPTIONS = {
  nodes: {
    borderWidth: 1,
    borderWidthSelected: 2,
    widthConstraint: {
      maximum: 150
    },
    color: {
      border: COLORS.main,
      background: COLORS.background,
      highlight: {
        border: COLORS.main,
        background: COLORS.background
      }
    },
    font: {
      color: COLORS.main,
      face: 'Bitter'
    }
  },
  edges: {
    color: {
      color: COLORS.main,
      highlight: COLORS.main
    },
    length: 200
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
    const { selectNote, selectedNote, nodes, edges, deleteConnection } = this.props;

    nodes.forEach(node => {
      if (this.nodes.get(node.id) === null) {
        this.nodes.add({
          x: this.lastClick ? this.lastClick.x : 0,
          y: this.lastClick ? this.lastClick.y : 0,
          ...node
        });

        selectNote(node.id);
      }
    });

    this.nodes.update(nodes);
    this.edges.update(edges);

    if (selectedNote !== null) {
      this.network.selectNodes([selectedNote]);
    }

    // update doesn't remove items
    this.nodes.get().forEach(graphNode => {
      if (nodes.find(node => node.id === graphNode.id) === undefined) {
        this.network.selectNodes([]);
        this.nodes.remove(graphNode.id);

        // delete all edges associated with this node
        edges.forEach(edge => {
          if (edge.from === graphNode.id || edge.to === graphNode.id) {
            this.edges.remove(edge.id);
            deleteConnection(edge.id);
          }
        });
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

  handleDoubleClick(e) {
    const { addNote } = this.props;

    this.lastClick = e.pointer.canvas;
    addNote();
  }

  initData () {
    const { nodes, edges } = this.props;

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
  nodes: PropTypes.array,
  edges: PropTypes.array,
  addNote: PropTypes.func.isRequired,
  addConnection: PropTypes.func.isRequired,
  deleteConnection: PropTypes.func.isRequired,
  selectedNote: PropTypes.number,
  selectNote: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  nodes: state.notes.map(note => ({
    id: note.id,
    label: formatTitle(note)
  })),
  edges: state.connections
});

const mapDispatchToProps = {
  addNote,
  addConnection,
  deleteConnection
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
