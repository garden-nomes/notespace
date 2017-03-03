import React, { Component } from 'react';
import { DataSet, Network } from 'vis';
import uuid from 'uuid';

const OPTIONS = {
  'nodes': {
    'borderWidth': 0,
    'borderWidthSelected': 0,
    'color': {
      'background': '#eceeef',
      'highlight': { 'background': '#f7f7f9' }
    },
    'font': { 'color': '#673C4F' }
  },
  'edges': { 'color': '#eceeef' }
};

class Graph extends Component {
  constructor (props) {
    super(props);
    this.identifier = 'note-graph';

    this.initGraph = this.initGraph.bind(this);
    this.initData = this.initData.bind(this);
    this.handleDeselectNode = this.handleDeselectNode.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  componentDidMount () {
    this.initData();
    this.initGraph();
  }

  handleDeselectNode (e) {
    if (e.event.srcEvent.shiftKey &&
        e.previousSelection.nodes.length > 0 &&
        e.nodes.length > 0) {
      const nodeId = e.nodes[0];
      const selectedId = e.previousSelection.nodes[0];
      this.edges.add({ 'from': nodeId, 'to': selectedId });

      // prevent graph from selecting new node
      this.network.selectNodes([selectedId]);
    }
  }

  handleDoubleClick (event) {
    let { x, y } = event.pointer.canvas;

    const id = uuid.v4();
    this.nodes.add({
      id, x, y,
      'label': 'new!'
    });

    this.network.selectNodes([id]);
  }

  initData () {
    const nodes = [
      { 'id': 0, 'label': 'test' },
      { 'id': 1, 'label': 'graph' },
      { 'id': 2, 'label': 'works' }
    ];

    const edges = [
      { 'from': 0, 'to': 1 },
      { 'from': 1, 'to': 2 },
      { 'from': 2, 'to': 0 }
    ];

    this.nodes = new DataSet(nodes);
    this.edges = new DataSet(edges);
  }

  initGraph () {
    let { nodes, edges } = this;

    const container = document.getElementById(this.identifier);
    const data = { nodes, edges };
    const options = OPTIONS;
    this.network = new Network(container, data, options);

    this.network.on('deselectNode', this.handleDeselectNode);
    this.network.on('doubleClick', this.handleDoubleClick);
  }

  render () {
    return <div id={this.identifier} />;
  }
}

export default Graph;
