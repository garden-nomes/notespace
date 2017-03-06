import React, { Component } from 'react';

import Help from './help';

class Overlay extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive(e) {
    e.preventDefault();

    this.setState((prevState) => ({
      active: !prevState.active
    }));
  }

  render() {
    const { active } = this.state;

    return (
      <div className={active ? 'overlay active' : 'overlay'}>
        {active && <Help />}

        <ul className="links">
          <li>
            <a href="#" className="font-weight-bold" onClick={this.toggleActive}>
              <i className="fa fa-question-circle"></i>
              &nbsp;{active ? 'close' : 'show'}
              &nbsp;help
            </a>
          </li>
          <li>
            <a href="https://github.com/noaner/notespace" target="_blank">
              <i className="fa fa-github"></i>
              &nbsp;view source
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Overlay;
