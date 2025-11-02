import React, { useContext, useMemo, useState } from "react";
import { TodoProvider, TodoContext } from "./contexts/TodoContext";
import TaskInput from "./components/TaskInput";
import Filters, { FILTERS } from "./components/Filters";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import Sorting, { SORT_MODES } from "./components/Sorting";
import SearchBar from "./components/SearchBar";

function MainArea() {
  const { todos, toggleTodo, removeTodo } = useContext(TodoContext);
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [sortMode, setSortMode] = useState(SORT_MODES.AZ);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = todos;

    if (filter === FILTERS.ACTIVE) result = result.filter((t) => !t.done);
    if (filter === FILTERS.COMPLETED) result = result.filter((t) => t.done);

    if (searchQuery) {
      result = result.filter((t) =>
        t.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortMode) {
      case SORT_MODES.AZ:
        result = [...result].sort((a, b) => a.text.localeCompare(b.text));
        break;
      case SORT_MODES.ZA:
        result = [...result].sort((a, b) => b.text.localeCompare(a.text));
        break;
      case SORT_MODES.DEADLINE:
        result = [...result].sort((a, b) => {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline) - new Date(b.deadline);
        });
        break;
      default:
        break;
    }

    return result;
  }, [todos, filter, sortMode, searchQuery]);

  return (
    <div>
      <TaskInput />
      <Filters filter={filter} setFilter={setFilter} />
      <Sorting mode={sortMode} setMode={setSortMode} />
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />
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
