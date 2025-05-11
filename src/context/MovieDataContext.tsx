import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
  FC,
  ReactNode,
} from "react";

export interface IMovieData {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string;
  release_date?: string;
}

interface MovieDataContextType {
  movieTitles: string[];
  setMovieTitles: Dispatch<SetStateAction<string[]>>;
  selectedMovieTitles: string[];
  setSelectedMovieTitles: Dispatch<SetStateAction<string[]>>;
  toggleSelectedMovieTitle: (title: string) => void;
  fetchedMovies: IMovieData[];
  setFetchedMovies: Dispatch<SetStateAction<IMovieData[]>>;
  removeFetchedMovie: (movieId: number) => void;
}

const MovieDataContext = createContext<MovieDataContextType | undefined>(
  undefined
);

interface MovieDataProviderProps {
  children: ReactNode;
}

export const MovieDataProvider: FC<MovieDataProviderProps> = ({ children }) => {
  const [movieTitles, setMovieTitles] = useState<string[]>([]);
  const [selectedMovieTitles, setSelectedMovieTitles] = useState<string[]>([]);
  const [fetchedMovies, setFetchedMovies] = useState<IMovieData[]>([]);

  useEffect(() => {
    if (movieTitles) setSelectedMovieTitles(movieTitles);
  }, [movieTitles]);

  const toggleSelectedMovieTitle = (title: string) => {
    if (selectedMovieTitles.includes(title)) {
      setSelectedMovieTitles(selectedMovieTitles.filter((t) => t !== title));
    } else {
      setSelectedMovieTitles([...selectedMovieTitles, title]);
    }
  };

  const removeFetchedMovie = (movieId: number) => {
    setFetchedMovies(fetchedMovies.filter((movie) => movie.id !== movieId));
  };

  return (
    <MovieDataContext.Provider
      value={{
        movieTitles,
        setMovieTitles,
        selectedMovieTitles,
        setSelectedMovieTitles,
        toggleSelectedMovieTitle,
        fetchedMovies,
        setFetchedMovies,
        removeFetchedMovie,
      }}
    >
      {children}
    </MovieDataContext.Provider>
  );
};

export const useMovieData = (): MovieDataContextType => {
  const context = useContext(MovieDataContext);
  if (!context) {
    throw new Error("useMovieData must be used within a MovieDataProvider");
  }
  return context;
};
