import { useState } from "react";

export default function useInput(initial = "") {
    const [value, setValue] = useState(initial);
    return {
        value,
        onChange: (e) => setValue(e.target.value),
        reset: () => setValue(""),
    };
}
