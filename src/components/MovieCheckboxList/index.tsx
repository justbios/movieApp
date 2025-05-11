import { FC } from "react";
import styles from "./styles.module.css";
import { useMovieData } from "../../context/MovieDataContext";

export const MovieCheckboxList: FC = () => {
  const { movieTitles, selectedMovieTitles, toggleSelectedMovieTitle } =
    useMovieData();

  return (
    <ul className={styles.list}>
      {movieTitles.map((title, index) => (
        <li key={index} className={styles.listItem}>
          <input
            type="checkbox"
            id={`movie-${index}`}
            checked={selectedMovieTitles.includes(title)}
            onChange={() => toggleSelectedMovieTitle(title)}
          />
          <label htmlFor={`movie-${index}`} className={styles.label}>
            {title}
          </label>
        </li>
      ))}
    </ul>
  );
};
