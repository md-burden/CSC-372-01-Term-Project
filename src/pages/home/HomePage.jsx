import GoalCardComponent from "../../components/GoalCardComponent.jsx";
import "../../styles/home.css";

function HomePage() {
  return (
    <div id="home">
      <div id="goals">
        <GoalCardComponent />
        <GoalCardComponent />
        <GoalCardComponent />
        <GoalCardComponent />
        <GoalCardComponent />
        <GoalCardComponent />
        <GoalCardComponent />
        <GoalCardComponent />
      </div>
    </div>
  );
}

export default HomePage;
