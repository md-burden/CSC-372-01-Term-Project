import "../../styles/mounts-minions-pages.css";

function MinionsPage() {
    return (
    <div className="mounts-minions-page">
      <div id="filter-bar">
        <label htmlFor="filter-type">Filter by Type:</label>
        <select name="filter-type" id="filter-type">
          <option value="all">All</option>
          <option value="mount">Mount</option>
          <option value="minion">Minion</option>
        </select>
      </div>
    </div>
  );
}

export default MinionsPage;