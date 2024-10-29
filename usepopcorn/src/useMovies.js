import { useState, useEffect } from "react";

const OMDb_API_KEY = "9fe67d95";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      (async function getMovies() {
        try {
          if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
          }
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${OMDb_API_KEY}&s=${query}
              `,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Faild to fetch movies");

          const moviesData = await res.json();
          if (moviesData.Response === "False")
            throw new Error("No such movie found");

          callback();
          setMovies(moviesData.Search);
        } catch (err) {
          console.log(err.name);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      })();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
