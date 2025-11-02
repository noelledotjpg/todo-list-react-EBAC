import React from "react";

export const SORT_MODES = {
  AZ: "A-Z",
  ZA: "Z-A",
  DEADLINE: "Deadline",
};

export default function Sorting({ mode, setMode }) {
  return (
    <div className="sorting">
      <label>Ordenar: </label>
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        {Object.values(SORT_MODES).map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>
  );
}
