import React from "react";
import styles from "./styles.module.css";
import { IMovieData, useMovieData } from "../../context/MovieDataContext";
import { useTMDBFetch } from "../../hooks/useTMDBFetch";
import { useNavigate } from "react-router";
import { FileUploader } from "../../components/FileUploader";
import { MovieCheckboxList } from "../../components/MovieCheckboxList";
import { SearchButton } from "../../components/SearchButton";

const UploadPage: React.FC = () => {
  const { selectedMovieTitles, setFetchedMovies } = useMovieData();
  const { fetchMoviesByTitle } = useTMDBFetch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (selectedMovieTitles.length > 0) {
      const results = await fetchMoviesByTitle(selectedMovieTitles);
      setFetchedMovies(
        results
          .flat()
          .filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m?.id === movie?.id)
          ) as IMovieData[]
      );
      navigate("/preview");
    } else {
      alert("Please select at least one movie.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Upload Movie List</h1>
      <FileUploader />
      <h2>Select Movies</h2>
      <MovieCheckboxList />
      <SearchButton label="Search" onClick={handleSearch} />
    </div>
  );
};

export default UploadPage;
