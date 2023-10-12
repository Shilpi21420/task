import React from "react";

const ListViewSwitch = ({ view, setView }) => {
  const switchToGrid = () => setView("grid");
  const switchToList = () => setView("list");

  return (
    <div className="list-view-switch">
      <button
        className={`grid-view-button ${view === "grid" ? "active" : ""}`}
        onClick={switchToGrid}
      >
        Grid View
      </button>
      <button
        className={`list-view-button ${view === "list" ? "active" : ""}`}
        onClick={switchToList}
      >
        List View
      </button>
    </div>
  );
};

export default ListViewSwitch;
