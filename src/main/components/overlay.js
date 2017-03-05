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
            <a href="#" onClick={this.toggleActive}>
              {active ? 'close help' : 'show help'}
            </a>
          </li>
          <li>
            <a href="https://github.com/noaner/notespace" target="_blank">
              view source
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Overlay;
