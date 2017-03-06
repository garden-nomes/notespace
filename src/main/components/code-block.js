import React, { Component, PropTypes } from 'react';
import hljs from 'highlight.js';

class CodeBlock extends Component {
  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    hljs.highlightBlock(this.refs.code);
  }

  render() {
    const { language, literal } = this.props;

    return (
      <pre>
        <code ref="code" className={language}>
          {literal}
        </code>
      </pre>
    );
  }
}

CodeBlock.propTypes = {
  language: PropTypes.string,
  literal: PropTypes.string
};

export default CodeBlock;
