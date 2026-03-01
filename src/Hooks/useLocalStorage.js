import { useEffect, useState } from "react";

export function useLocalStorage(intialValue, key) {
  const [value, setValue] = useState(function () {
    const watchList = localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : intialValue;
    return watchList;
  });

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
