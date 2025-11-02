import React from "react";

export default function SearchBar({ query, setQuery }) {
    return (
        <input
            className="search-bar"
            placeholder="Pesquisar tarefas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}
