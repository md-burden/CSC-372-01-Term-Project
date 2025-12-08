import "../styles/mount-minion-card.css";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCouch,
  faMountain,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import MountMinionDetailsComponent from "./MountMinionDetailsComponent.jsx";
import TYPE from "../../config/enum.js";

class MountMinionCardComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.type) {
      return null;
    }

    return this.props.type === TYPE.MOUNT ? this.mountCard() : this.minionCard();
  }

  mountCard() {
    const chair = <FontAwesomeIcon icon={faCouch} size={"lg"} />;
    const mountain = <FontAwesomeIcon icon={faMountain} size={"lg"} />;
    const plane = <FontAwesomeIcon icon={faPlane} size={"lg"} />;
    const { data, googleId, navigate, type, isCollectionPage } = this.props;

    return (
      <div className="mount-minion-card">
        <h3>{data.name}</h3>
        <div id="mount-details">
          <span>
            {data.seats} {chair}
          </span>
          <span>{data.movement === "Terrestrial" ? mountain : plane}</span>
        </div>
        <img src={data.image} alt={data.name} />
        <MountMinionDetailsComponent 
          type={type} 
          data={data} 
          googleId={googleId} 
          navigate={navigate}
          isCollectionPage={isCollectionPage}
        />
      </div>
    );
  }

  minionCard() {
    const { data, googleId, navigate, type, isCollectionPage } = this.props;
    
    return (
      <div className="mount-minion-card">
        <h3>{data.name}</h3>
        <img src={data.image} alt={data.name} />
        <MountMinionDetailsComponent 
          type={type} 
          data={data} 
          googleId={googleId} 
          navigate={navigate}
          isCollectionPage={isCollectionPage}
        />
      </div>
    );
  }
}

export default MountMinionCardComponent;
