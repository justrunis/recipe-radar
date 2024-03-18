import { useEffect, useState } from "react";

/**
 * Custom hook for fetching data.
 *
 * @param {Function} fetchFn - The function to fetch data.
 * @param {*} initialValue - The initial value for fetched data.
 * @returns {Object} - An object containing the state of the fetch operation.
 */
export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return { isFetching, fetchedData, setFetchedData, error };
}
