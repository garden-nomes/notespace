import React, { PropTypes, Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { text: props.note.text };
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
      <textarea
        className="note-textarea form-control"
        value={text}
        onChange={this.handleChange}
      />
    );
  }
}

Form.propTypes = {
  note: PropTypes.object.isRequired,
  editNote: PropTypes.func.isRequired
};

export default Form;
