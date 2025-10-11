import React, { useState, useEffect, useContext, useMemo, useCallback, createContext } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useLocalStorage("todos_vite_dark", []);

  const addTodo = useCallback((text) => {
    if (!text.trim()) return;
    setTodos((prev) => [
      { id: Date.now().toString(), text: text.trim(), done: false, createdAt: new Date().toISOString() },
      ...prev
    ]);
  }, [setTodos]);

  const toggleTodo = useCallback((id) => setTodos((prev) => prev.map(t => t.id === id ? { ...t, done: !t.done } : t)), [setTodos]);
  const removeTodo = useCallback((id) => setTodos((prev) => prev.filter(t => t.id !== id)), [setTodos]);
  const clearCompleted = useCallback(() => setTodos((prev) => prev.filter(t => !t.done)), [setTodos]);

  const value = useMemo(() => ({ todos, addTodo, toggleTodo, removeTodo, clearCompleted }), [todos, addTodo, toggleTodo, removeTodo, clearCompleted]);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) || initialValue; } 
    catch { return initialValue; }
  });

  useEffect(() => { localStorage.setItem(key, JSON.stringify(state)); }, [key, state]);
  return [state, setState];
}

function useInput(initial = "") {
  const [value, setValue] = useState(initial);
  return { value, onChange: e => setValue(e.target.value), reset: () => setValue("") };
}

function TaskInput() {
  const { addTodo } = useContext(TodoContext);
  const input = useInput("");

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    addTodo(input.value);
    input.reset();
  }, [addTodo, input]);

  return (
    <form onSubmit={onSubmit} className="task-input">
      <input placeholder="Nomeie sua tarefa..." {...input} />
      <button type="submit"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg></button>
    </form>
  );
}

const FILTERS = { ALL: "all", ACTIVE: "active", COMPLETED: "completed" };
const Filters = React.memo(({ filter, setFilter }) => (
  <div className="filters">
    {Object.values(FILTERS).map(f => (
      <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
        {f === "all" ? "Todas" : f === "active" ? "Pendentes" : "Concluídas"}
      </button>
    ))}
  </div>
));

function TaskItem({ todo, onToggle, onRemove }) {
  return (
    <li className="task-item">
      <label className="custom-checkbox">
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
        <span className="checkmark"></span>
        <span className={todo.done ? "done" : ""}>{todo.text}</span>
      </label>
      <button onClick={() => onRemove(todo.id)}><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="white"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>
    </li>
  );
}

const TaskList = React.memo(({ items, onToggle, onRemove }) => {
  if (!items.length) return <p className="empty">Nenhuma tarefa</p>;
  return (
    <ul className="task-list">
      {items.map(t => <TaskItem key={t.id} todo={t} onToggle={onToggle} onRemove={onRemove} />)}
    </ul>
  );
});

function Footer() {
  const { todos, clearCompleted } = useContext(TodoContext);
  const completed = todos.filter(t => t.done).length;
  const pending = todos.length - completed;

  return (
    <footer className="footer">
      <span>{pending} pendente(s) • {completed} concluída(s)</span>
      <button onClick={clearCompleted}>Limpar concluídas</button>
    </footer>
  );
}

function MainArea() {
  const { todos, toggleTodo, removeTodo } = useContext(TodoContext);
  const [filter, setFilter] = useState(FILTERS.ALL);

  const filtered = useMemo(() => {
    if (filter === FILTERS.ACTIVE) return todos.filter(t => !t.done);
    if (filter === FILTERS.COMPLETED) return todos.filter(t => t.done);
    return todos;
  }, [todos, filter]);

  return (
    <div>
      <TaskInput />
      <Filters filter={filter} setFilter={setFilter} />
      <TaskList items={filtered} onToggle={toggleTodo} onRemove={removeTodo} />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <TodoProvider>
      <div className="container">
        <h1>Todo List</h1>
        <p className="subtitle">Sua própria lista de coisas, simples e fácil de usar.</p>
        <MainArea />
      </div>
    </TodoProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
