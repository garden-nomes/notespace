import React from 'react';

const Help = () => (
  <div>
    <h5>The Graph</h5>
    <ul className="help-text">
      <li><strong>click</strong><i> a note to select it</i></li>
      <li><strong>⇧ + click</strong><i> another note to connect them</i></li>
      <li><strong>double click</strong><i> on the graph to create a new note</i></li>
    </ul>
    <h5>Keyboard Shortcuts</h5>
    <ul className="help-text">
      <li><strong>esc</strong><i> deselect current note</i></li>
      <li><strong>⇧ + ⌫</strong><i> delete current note</i></li>
      <li><strong>⇧ + space</strong><i> toggle edit mode</i></li>
    </ul>
  </div>
);

export default Help;
