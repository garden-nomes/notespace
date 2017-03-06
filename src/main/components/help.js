import React from 'react';

const Help = () => (
  <div>
    <h5>The Graph</h5>
    <ul className="help-text">
      <li><strong>click</strong> a note to select it</li>
      <li><strong>⇧ + click</strong> another note to connect them</li>
      <li><strong>double click</strong> on the graph to create a new note</li>
    </ul>
    <h5>Keyboard Shortcuts</h5>
    <ul className="help-text">
      <li><strong>esc</strong> to deselect a note</li>
      <li><strong>⇧ + ⌫</strong> to delete current note</li>
      <li><strong>⇧ + space</strong> to toggle edit mode</li>
    </ul>
  </div>
);

export default Help;
