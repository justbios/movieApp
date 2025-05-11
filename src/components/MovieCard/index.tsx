import { FC } from "react";
import styles from "./styles.module.css";
import { IMovieData } from "../../context/MovieDataContext";
import { LuTrash2 } from "react-icons/lu";
import { BASE_IMAGE_URL } from "../../utils/const";

interface IMovieCardProps {
  movie: IMovieData;
  onRemove: (id: number) => void;
}

export const MovieCard: FC<IMovieCardProps> = ({ movie, onRemove }) => (
  <div className={styles.card}>
    {movie.poster_path && (
      <img
        src={`${BASE_IMAGE_URL}${movie.poster_path}`}
        alt={movie.title}
        className={styles.poster}
      />
    )}
    <div className={styles.info}>
      <h3 className={styles.title}>{movie.title}</h3>
      <p className={styles.overview}>{movie.overview?.substring(0, 150)}...</p>
      <p className={styles.release}>Release: {movie.release_date}</p>
    </div>
    <button className={styles.removeButton} onClick={() => onRemove(movie.id)}>
      <LuTrash2 />
    </button>
  </div>
);
