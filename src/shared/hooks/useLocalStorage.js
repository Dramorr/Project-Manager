  import { useEffect, useState } from "react";

  export default function useLocalStorage(key, initialValue){
    const [items, setItems] = useState(() => {
      try{
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialValue;
      } catch { return initialValue; }
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(items));
    }, [items]);

    return { items, setItems};
  }