import React from "react";

export const FILTERS = { ALL: "all", ACTIVE: "active", COMPLETED: "completed" };

export default React.memo(function Filters({ filter, setFilter }) {
    return (
        <div className="filters">
            {Object.values(FILTERS).map((f) => (
                <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
                    {f === "all" ? "Todas" : f === "active" ? "Pendentes" : "Concluídas"}
                </button>
            ))}
        </div>
    );
});
