import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(key)) || initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}
