import "../styles/goal-card.css";

import { useState, useEffect } from "react";
import MountsService from "../services/MountsService";
import GoalService from "../services/GoalService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCouch,
  faMountain,
  faPlane,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

function GoalCardComponent({ goal, mountId }) {
  const [creature, setCreature] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  const chair = <FontAwesomeIcon icon={faCouch} size={"lg"} />;
  const mountain = <FontAwesomeIcon icon={faMountain} size={"lg"} />;
  const plane = <FontAwesomeIcon icon={faPlane} size={"lg"} />;
  const check = <FontAwesomeIcon icon={faCircleCheck} size={"lg"} />;
  const cross = <FontAwesomeIcon icon={faCircleXmark} size={"lg"} />;

  useEffect(() => {
    const fetchCreature = async () => {
      if (!mountId) return;

      try {
        setLoading(true);
        const response = await MountsService.getMountById(mountId);
        setCreature(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreature();
  }, [mountId]);

  const saveChanges = () => {
    const updatedGoalName = document.getElementById("goal-title-input").value;
    const updatedNotes = document.getElementById("notes-input").value;

    GoalService.updateGoal(goal.id, updatedGoalName, updatedNotes)
      .then(() => {
        setEditing(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error updating goal:", err);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="goal-card">
      <div id="goal-title">
        {headerTitle()}
        {headerButton()}
      </div>
      <div id="goal-content">
        <div id="details">
          <div id="description">
            <div className="detail-item">
              <strong>Name</strong>
              <p>{creature.name}</p>
            </div>
            <div className="detail-item">
              <strong>Movement</strong>
              <p>
                {creature.movement === "Terrestrial" ? mountain : plane}{" "}
                {creature.movement}
              </p>
            </div>
            <div className="detail-item">
              <strong>Seats</strong>
              <p>
                {creature.seats} {chair}
              </p>
            </div>
            <div className="detail-item">
              <strong>Patch</strong>
              <p>{creature.patch}</p>
            </div>
            <div className="detail-item">
              <strong>Tradable</strong>
              <p>
                {creature.tradable ? check : cross}{" "}
                {creature.tradable ? "Yes" : "No"}
              </p>
            </div>
            <div className="detail-item">
              <strong>Owned By</strong>
              <p>{creature.owned}</p>
            </div>
            <div className="detail-item">
              <strong>Source</strong>
              <a href="#">{creature.sources?.[0]?.text || "N/A"}</a>
            </div>
          </div>

          <div className="detail-item">
            <strong>Description</strong>
            <p>{creature.enhanced_description}</p>
          </div>
        </div>

        <div id="image">
          <img src={creature.image} alt={creature.name} id="mount-image" />
        </div>
      </div>
      {notesSection()}
      {footerButtons()}
    </div>
  );

  function headerTitle() {
    if (editing) {
      return (
        <input type="text" defaultValue={goal.goalName} id="goal-title-input" />
      );
    } else {
      return <h2 id="goal-title">{goal.goalName}</h2>;
    }
  }

  function headerButton() {
    const onDelete = () => {
      GoalService.deleteGoal(goal.id);
      setEditing(false);
      window.location.reload();
    };

    const onComplete = () => {
      GoalService.completeGoal(goal.id);
      setEditing(false);
      window.location.reload();
    };

    if (editing) {
      return (
        <div id="delete">
          <button id="delete-button" onClick={onDelete}>
            Delete Goal
          </button>
        </div>
      );
    } else {
      return (
        <div id="complete">
          <button onClick={onComplete}>Complete Goal</button>
        </div>
      );
    }
  }

  function notesSection() {
    if (editing) {
      return (
        <textarea
          id="notes-input"
          defaultValue={goal?.notes || ""}
          placeholder="Enter your notes here..."
        />
      );
    } else {
      return (
        <div id="notes">
          <strong>User Notes</strong>
          <p>{goal?.notes || "No notes available"}</p>
        </div>
      );
    }
  }

  function footerButtons() {
    if (editing) {
      return (
        <div id="actions">
          <button onClick={saveChanges}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      );
    } else {
      return (
        <div id="actions">
          <button onClick={() => setEditing(true)}>Edit Goal</button>
        </div>
      );
    }
  }
}

export default GoalCardComponent;
