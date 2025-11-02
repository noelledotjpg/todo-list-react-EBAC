import React from "react";

export default function TaskItem({ todo, onToggle, onRemove }) {
    const now = new Date();
    const deadlineDate = todo.deadline ? new Date(todo.deadline) : null;

    let deadlineClass = "";
    if (deadlineDate) {
        if (deadlineDate < now) {
            deadlineClass = "past-due"; // passado
        } else if (deadlineDate - now < 2 * 24 * 60 * 60 * 1000) {
            deadlineClass = "due-soon"; // menos de 2 dias
        }
    }

    return (
        <li className="task-item">
            <label className="custom-checkbox">
                <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
                <span className="checkmark"></span>
                <span className={todo.done ? "done" : ""}>{todo.text}</span>
            </label>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {deadlineDate && (
                    <span className={`deadline ${deadlineClass}`}>
                        {deadlineDate.toLocaleDateString()}
                    </span>
                )}
                <button onClick={() => onRemove(todo.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </li>
    );
}
