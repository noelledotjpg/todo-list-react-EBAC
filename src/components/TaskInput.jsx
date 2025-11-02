import React, { useContext, useCallback } from "react";
import { TodoContext } from "../contexts/TodoContext";
import useInput from "../hooks/useInput";

export default function TaskInput() {
    const { addTodo } = useContext(TodoContext);
    const textInput = useInput("");
    const deadlineInput = useInput("");

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            addTodo(textInput.value, deadlineInput.value || null);
            textInput.reset();
            deadlineInput.reset();
        },
        [addTodo, textInput, deadlineInput]
    );

    return (
        <form onSubmit={onSubmit} className="task-input">
            <input placeholder="Nomeie sua tarefa..." {...textInput} />
            <input type="date" {...deadlineInput} />
            <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                </svg>
            </button>
        </form>
    );
}
