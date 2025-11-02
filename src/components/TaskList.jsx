import React from "react";
import TaskItem from "./TaskItem";

export default React.memo(function TaskList({ items, onToggle, onRemove }) {
    if (!items.length) return <p className="empty">Nenhuma tarefa</p>;

    return (
        <ul className="task-list">
            {items.map((t) => (
                <TaskItem key={t.id} todo={t} onToggle={onToggle} onRemove={onRemove} />
            ))}
        </ul>
    );
});
