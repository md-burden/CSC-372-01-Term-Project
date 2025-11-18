import "../styles/long-card.css";

import React, { Component } from "react";

// TODO:
// Pass in ICON, NAME, and ID

export const type = { MOUNT: "mount", MINION: "minion" };

class LongCardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.type = props.type;
  }

  render() {

    // Return nothing if no type is provided
    if (!this.type) {
      return null;
    }

    return this.type === type.MOUNT ? this.mountCard() : this.minionCard();
  }

  mountCard() {
    return (
      <div className="long-card">
        <img
          src="https://ffxivcollect.com/images/mounts/small/235.png"
          alt="Search item"
        ></img>
        <div id="content">
          <h3>Cerberus</h3>
          <p>ID: 123</p>
          <div id="owned-checkbox">
            <label htmlFor="owned">Owned:</label>
            <input
              type="checkbox"
              id="owned"
              name="owned"
              value="owned"
            ></input>
          </div>
        </div>
        <button>Create Goal</button>
      </div>
    );
  }

  minionCard() {
    return (
      <div className="long-card">
        <img
          src="https://ffxivcollect.com/images/minions/small/552.png"
          alt="Search item"
        ></img>
        <div id="content">
          <h3>Vigorwasp</h3>
          <p>ID: 552</p>
          <div id="owned-checkbox">
            <label htmlFor="owned">Owned:</label>
            <input
              type="checkbox"
              id="owned"
              name="owned"
              value="owned"
            ></input>
          </div>
        </div>
        <button>Create Goal</button>
      </div>
    );
  }
}

export default LongCardComponent;
