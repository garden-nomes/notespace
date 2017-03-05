import React, { PropTypes, Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    const { note } = props;

    this.state = {
      text: note.new ? '' : note.text
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { note, editNote } = this.props;
    const text = e.target.value;

    this.setState({ text });
    editNote(note.id, text);
  }

  render() {
    const { text } = this.state;

    return (
      <div className="note-form">
        <textarea
          style={{ height: window.innerHeight - 107 }}
          autoFocus
          placeholder="Write your note here..."
          value={text}
          onChange={this.handleChange}
        />

        <div className="small text-muted">
          <a href="https://daringfireball.net/projects/markdown/syntax" target="_blank">
            MarkDown
          </a>
          &nbsp;formatting supported
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  note: PropTypes.object.isRequired,
  editNote: PropTypes.func.isRequired
};

export default Form;
