import React, { createContext, useMemo, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
    const [todos, setTodos] = useLocalStorage("todos_vite_dark", []);

    const addTodo = useCallback((text, deadline = null) => {
        if (!text.trim()) return;
        setTodos((prev) => [
            {
                id: Date.now().toString(),
                text: text.trim(),
                done: false,
                createdAt: new Date().toISOString(),
                deadline,
            },
            ...prev,
        ]);
    }, [setTodos]);

    const toggleTodo = useCallback(
        (id) => setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))),
        [setTodos]
    );

    const removeTodo = useCallback(
        (id) => setTodos((prev) => prev.filter((t) => t.id !== id)),
        [setTodos]
    );

    const clearCompleted = useCallback(
        () => setTodos((prev) => prev.filter((t) => !t.done)),
        [setTodos]
    );

    const value = useMemo(
        () => ({ todos, addTodo, toggleTodo, removeTodo, clearCompleted }),
        [todos, addTodo, toggleTodo, removeTodo, clearCompleted]
    );

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
