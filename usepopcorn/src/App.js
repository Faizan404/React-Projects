import { useEffect, useState } from "react";
import StartRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useEvent } from "./useEvent";
import { useLocalStorage } from "./useLocalStorage";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const OMDb_API_KEY = "9fe67d95";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  //TODO -       CUSTOM HOOKS
  useEvent(handleMovieClose, "Escape");
  const { movies, isLoading, error } = useMovies(query, handleMovieClose);
  const [watched, setWatched] = useLocalStorage([], "watched");
  //TODO -       CUSTOM HOOKS

  function handleMovieSelect(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleMovieClose(id) {
    setSelectedId(null);
  }
  function handleAddMovieToList(addMovie) {
    setWatched((watch) => [...watch, addMovie]);
  }
  function handleDeleteWatched(id) {
    setWatched(watched.filter((movies) => movies.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <SearchResults movies={movies} />
      </NavBar>
      <Main>
        <MoviesList>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <SearchedMovie movies={movies} onSelectMovie={handleMovieSelect} />
          )}
          {error && <ErrorMessage message={error} />}
        </MoviesList>
        <MoviesList>
          {selectedId ? (
            <MovieDetails
              movieId={selectedId}
              onCloseMovie={handleMovieClose}
              onAddToList={handleAddMovieToList}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovies
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </MoviesList>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message = "Something went wrong!" }) {
  return <p className="error">⚠️{message}</p>;
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function SearchResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function MoviesList({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function SearchedMovie({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onSelectMovie={onSelectMovie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ movieId, onCloseMovie, onAddToList, watched }) {
  const [movies, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(movieId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === movieId
  )?.userRating;

  function handleAdd() {
    onAddToList({
      ...movies,
      userRating,
      Runtime: Number(movies.Runtime.split(" ")[0]),
    });
    onCloseMovie();
  }

  useEffect(
    function () {
      (async function getMovieDetails() {
        try {
          setIsLoading(true);
          setError("");
          const res =
            await fetch(`http://www.omdbapi.com/?apikey=${OMDb_API_KEY}&i=${movieId}
        `);
          if (!res.ok) throw new Error("Faild to fetch movies");

          const moviesData = await res.json();
          if (moviesData.Response === "False")
            throw new Error("No such movie found");

          setMovies(moviesData);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      })();
    },
    [movieId]
  );

  useEffect(
    function () {
      if (!movies.Title) return;
      document.title = `Movies | ${movies.Title}`;

      console.log(movies.Title);

      return function () {
        document.title = "usePopcorn";
      };
    },

    [movies.Title]
  );

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={movies.Poster} alt={movies.Title} />
        <div className="details-overview">
          <h2>{movies.Title}</h2>
          <p>
            {movies.Released} &bull; {movies.Runtime}
          </p>
          <p>{movies.Genre}</p>
          <p>
            <span>⭐️</span>
            {movies.imdbRating} IMDb Rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {isWatched ? (
            <p>You already rated this movie with {watchedUserRating} ⭐</p>
          ) : (
            <StartRating maxRating={10} size={18} onSetRating={setUserRating} />
          )}
          {userRating && (
            <button className="btn-add" onClick={handleAdd}>
              + Add to list
            </button>
          )}
        </div>
        <p>
          <em>{movies.Plot}</em>
        </p>
        <p>Starring: {movies.Actors}</p>
        <p>Directed By: {movies.Director}</p>
      </section>
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.Runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.Runtime} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovies({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => onDeleteWatched(movie.imdbID)}
      ></button>
    </li>
  );
}
