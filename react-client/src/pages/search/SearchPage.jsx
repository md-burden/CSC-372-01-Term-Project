import "../../styles/search-page.css";

import LongCardComponent, {
  type,
} from "../../components/LongCardComponent.jsx";

function SearchPage() {
  return (
    <div className="search-page">
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

export default MountsPage;
