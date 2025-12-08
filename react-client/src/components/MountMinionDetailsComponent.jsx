import "../styles/mm-details.css";

import React from "react";
import TYPE from "../../config/enum.js";
import GoalService from "../services/GoalService.jsx";
import OwnedMountsService from "../services/OwnedMountsService.jsx";
import OwnedMinionsService from "../services/OwnedMinionsService.jsx";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCouch,
  faMountain,
  faPlane,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

class MountMinionDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createGoal: false,
      goalName: "",
      goalNotes: "",
    };
  }

  async submitGoal(closeModal) {
    let alreadyOwned;
    if(this.props.type === TYPE.MOUNT){
      alreadyOwned = await OwnedMountsService.checkOwnedMount(
        this.props.googleId,
        this.props.data.id
      );
    } else {
      alreadyOwned = await OwnedMinionsService.checkOwnedMinion(
        this.props.googleId,
        this.props.data.id
      );
    }

    if(alreadyOwned.data.owned){
      alert("You already own this item!");
      return;
    }

    if (!this.state.goalName || this.state.goalName.trim() === "") {
      alert("Goal name is required");
      return;
    }

    if (!this.props.googleId) {
      alert("User not authenticated");
      return;
    }

    try {
      await GoalService.createGoal(
        this.props.googleId,
        this.state.goalName,
        this.state.goalNotes,
        this.props.data.id,
        this.props.type
      );
      alert("Goal created successfully!");
      this.setState({
        createGoal: false,
        goalName: "",
        goalNotes: "",
      });
      if (closeModal) closeModal();
      if (this.props.navigate) {
        this.props.navigate("/");
      }
    } catch (error) {
      console.error("Error creating goal:", error);
      alert("Failed to create goal");
    }
  }

  render() {
    if (!this.props.type) {
      return null;
    }

    return (
      <Popup trigger={<button className="button">Details</button>} modal nested>
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header">{this.props.data.name}</div>
            <div className="content">
              {this.props.type === TYPE.MOUNT
                ? this.renderMountDetails()
                : this.renderMinionDetails()}
            </div>
            {this.renderActions(close)}
          </div>
        )}
      </Popup>
    );
  }

  renderActions(close) {
    if (this.state.createGoal) {
      return (
        <div className="actions">
          <button onClick={() => this.submitGoal(close)}>Submit Goal</button>
          <button
            className="button"
            onClick={() => this.setState({ createGoal: false })}
          >
            Cancel
          </button>
        </div>
      );
    }

    return (
      <div className="actions">
        {!this.props.isCollectionPage && (
          <button onClick={() => this.setState({ createGoal: true })}>
            Create Goal
          </button>
        )}
        <button className="button" onClick={close}>
          Close
        </button>
      </div>
    );
  }

  renderMountDetails() {
    const { data } = this.props;
    const chair = <FontAwesomeIcon icon={faCouch} size={"lg"} />;
    const mountain = <FontAwesomeIcon icon={faMountain} size={"lg"} />;
    const plane = <FontAwesomeIcon icon={faPlane} size={"lg"} />;
    const check = <FontAwesomeIcon icon={faCircleCheck} size={"lg"} />;
    const cross = <FontAwesomeIcon icon={faCircleXmark} size={"lg"} />;

    return (
      <div className="details-section">
        <img src={data.image} alt={data.name} />
        <div className="info-grid">
          <div className="info-item">
            <strong>Movement</strong>
            <p>
              {data.movement === "Terrestrial" ? mountain : plane}{" "}
              {data.movement}
            </p>
          </div>
          <div className="info-item">
            <strong>Seats</strong>
            <p>
              {data.seats} {chair}
            </p>
          </div>
          <div className="info-item">
            <strong>Patch</strong>
            <p>{data.patch}</p>
          </div>
          <div className="info-item">
            <strong>Tradable</strong>
            <p>
              {data.tradable ? check : cross} {data.tradable ? "Yes" : "No"}
            </p>
          </div>
          <div className="info-item">
            <strong>Owned By</strong>
            <p>{data.owned}</p>
          </div>
          <div className="info-item">
            <strong>Source</strong>
            <p>{data.sources?.[0]?.text || "N/A"}</p>
          </div>
        </div>
        <div className="description">
          <strong>Description</strong>
          <p>{data.enhanced_description}</p>
        </div>
        <div className="tooltip">
          <strong>Tooltip</strong>
          <p>{data.tooltip}</p>
        </div>
        {this.renderGoalInputs()}
      </div>
    );
  }

  renderMinionDetails() {
    const { data } = this.props;
    const chair = <FontAwesomeIcon icon={faCouch} size={"lg"} />;
    const mountain = <FontAwesomeIcon icon={faMountain} size={"lg"} />;
    const plane = <FontAwesomeIcon icon={faPlane} size={"lg"} />;
    const check = <FontAwesomeIcon icon={faCircleCheck} size={"lg"} />;
    const cross = <FontAwesomeIcon icon={faCircleXmark} size={"lg"} />;


    return (
      <div className="details-section">
        <img src={data.image} alt={data.name} />
        <div className="info-grid">
          <div className="info-item">
            <strong>Behavior</strong>
            <p>{data.behavior.name}</p>
          </div>
          <div className="info-item">
            <strong>Patch</strong>
            <p>{data.patch}</p>
          </div>
          <div className="info-item">
            <strong>Tradable</strong>
            <p>
              {data.tradable ? check : cross} {data.tradable ? "Yes" : "No"}
            </p>
          </div>
          <div className="info-item">
            <strong>Owned By</strong>
            <p>{data.owned}</p>
          </div>
          <div className="info-item">
            <strong>Source</strong>
            <p>{data.sources?.[0]?.text || "N/A"}</p>
          </div>
          <div className="info-item">
            <strong>HP</strong>
            <p>{data.verminion?.hp || "N/A"}</p>
          </div>
          <div className="info-item">
            <strong>Attack</strong>
            <p>{data.verminion?.attack || "N/A"}</p>
          </div>
          <div className="info-item">
            <strong>Defense</strong>
            <p>{data.verminion?.defense || "N/A"}</p>
          </div>
          <div className="info-item">
            <strong>Cost</strong>
            <p>{data.verminion?.cost || "N/A"}</p>
          </div>
          <div className="info-item">
            <strong>Speed</strong>
            <p>{data.verminion?.speed || "N/A"}</p>
          </div>
          <div className="info-item">
            <strong>Area Attack</strong>
            <p>{data.verminion?.area_attack ? check : cross || "N/A"} {data.tradable ? "Yes" : "No" || ""}</p>
          </div>
          <div className="info-item">
            <strong>Skill</strong>
            <p>{data.verminion?.skill || "Skill Name Missing"}</p>
          </div>
          <div className="info-item">
            <strong>Skill Description</strong>
            <p>{data.verminion?.skill_description || "Skill Description Missing"}</p>
          </div>
        </div>
        <div className="description">
          <strong>Description</strong>
          <p>{data.enhanced_description}</p>
        </div>
        <div className="tooltip">
          <strong>Tooltip</strong>
          <p>{data.tooltip}</p>
        </div>
        {this.renderGoalInputs()}
      </div>
    );
  }

  renderGoalInputs() {
    if (!this.state.createGoal) {
      return null;
    }

    return (
      <>
        <div id="goal-name-input">
          <label htmlFor="goalName">Goal Name</label>
          <input
            type="text"
            placeholder="Enter goal name here..."
            name="goalName"
            value={this.state.goalName}
            onChange={(e) => this.setState({ goalName: e.target.value })}
          />
        </div>
        <div id="goal-notes-input">
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            rows="4"
            cols="50"
            placeholder="Enter notes here..."
            value={this.state.goalNotes}
            onChange={(e) => this.setState({ goalNotes: e.target.value })}
          ></textarea>
        </div>
      </>
    );
  }
}

export default MountMinionDetailsComponent;
