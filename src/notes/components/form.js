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
      <textarea
        autoFocus
        placeholder="Write your note here..."
        className="form-control"
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
