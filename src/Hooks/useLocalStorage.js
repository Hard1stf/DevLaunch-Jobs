import { useEffect, useState } from "react";

const useLocalStorage = (key, initialization) => {
  const [storedValue, setStoredValue] = useState(() => {
        const storedJobs = localStorage.getItem(key);
  
        return storedJobs ? JSON.parse(storedJobs) : initialization;
  }); // implementing lazy initialization, this will run once during initial render.

  useEffect(() => {
      localStorage.setItem(key, JSON.stringify(storedValue))
    }, [key, storedValue])

    return [storedValue, setStoredValue];
};

export default useLocalStorage;