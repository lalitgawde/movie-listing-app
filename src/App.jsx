import { useState } from "react";
import MovieList from "./components/MovieList/MovieList";
import NavBar from "./components/NavBar/NavBar";
import WatchMovieList from "./components/WatchMovieList/WatchMovieList";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const InputChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div className="app">
      <NavBar search={searchInput} onChange={InputChangeHandler} />
      <main className="main">
        <MovieList />
        <WatchMovieList />
      </main>
      <footer className="footer">
        <p>© 2024 Movie Listing App</p>
      </footer>
    </div>
  );
}

export default App;
