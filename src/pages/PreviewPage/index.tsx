import React from "react";
import { useMovieData } from "../../context/MovieDataContext";
import styles from "./styles.module.css";
import { MovieCard } from "../../components/MovieCard";
import { SearchButton } from "../../components/SearchButton";

const PreviewPage: React.FC = () => {
  const { fetchedMovies, removeFetchedMovie } = useMovieData();

  const handleSave = async () => {
    const saveData = JSON.stringify(fetchedMovies);
    console.log("Saving data:", saveData);
  };

  return (
    <div className={styles.container}>
      <h1>Preview Movies</h1>
      {fetchedMovies.length > 0 ? (
        <div className={styles.movieList}>
          {fetchedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemove={removeFetchedMovie}
            />
          ))}
        </div>
      ) : (
        <p>No movies fetched yet.</p>
      )}
      <SearchButton label="Save" onClick={handleSave} />
    </div>
  );
};

export default PreviewPage;
