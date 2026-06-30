import { useCallback, useEffect, useState } from "react";

const useFetch = (url, initialValue, errorMsg, isInitialRun) => {
  const [response, setResponse] = useState(initialValue);
  const [loading, setLoading] = useState(isInitialRun ? true : false);
  const [error, setError] = useState(null);

  const memoriesFunc = useCallback(
    async function fetchData(
      configObj = {},
      urlPara = "",
      controllerRef = null,
    ) {
      let newUrl = url;
      if (urlPara !== "") {
        newUrl = url + urlPara;
      }
      setError("");
      setLoading(true);
      // Create new controller
      let signal;
      if (controllerRef) {
        controllerRef.current = new AbortController();
        signal = controllerRef.current.signal;
      }
      const fetchOptions = {
        ...configObj,
        ...(signal ? { signal } : {}),
      };
      try {
        const response = await fetch(newUrl, fetchOptions);
        if (!response.ok) {
          throw new Error(errorMsg);
        }
        const data = await response.json();
        if (data && data.Response === "False") {
          setResponse([]);
          throw new Error("Movie not found!");
        }
        setResponse(data);
        setLoading(false);
      } catch (error) {
        // Ignore AbortError
        if (error.name === "AbortError") {
          return;
        }
        setLoading(false);
        setError(error.message);
      }
    },
    [url, errorMsg],
  );

  useEffect(() => {
    if ((url || errorMsg) && isInitialRun) {
      memoriesFunc();
    }
    return () => {
      setResponse(null);
      setLoading(false);
      setError(null);
    };
  }, [url, errorMsg, memoriesFunc, isInitialRun]);

  return { response, loading, error, setResponse, fetchData: memoriesFunc };
};

export default useFetch;
