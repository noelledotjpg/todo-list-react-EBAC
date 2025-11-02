import React, { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

export default function Footer() {
  const { todos, clearCompleted } = useContext(TodoContext);
  const completed = todos.filter((t) => t.done).length;
  const pending = todos.length - completed;

  return (
    <footer className="footer">
      <span>{pending} pendente(s) • {completed} concluída(s)</span>
      <button onClick={clearCompleted}>Limpar concluídas</button>
    </footer>
  );
}
