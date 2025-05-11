import { useState } from 'react';
import { IMovieData } from '../context/MovieDataContext';
import { searchMovie } from '../api/movie';


interface TMDBFetchState {
  loading: boolean;
  error: string | null;
  fetchMoviesByTitle: (titles: string[]) => Promise<IMovieData[]>;
}

export const useTMDBFetch = (): TMDBFetchState => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMoviesByTitle = async (titles: string[]): Promise<IMovieData[]> => {
    setLoading(true);
    setError(null);
    try {
      const allResults = await Promise.all(
        titles.map(async (title) => {
          const res = await searchMovie(title)
          return res.data.results[0];
        })
      );
      setLoading(false);
      return allResults.filter((result) => result !== undefined);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch movie data.');
      setLoading(false);
      return [];
    }
  };

  return { loading, error, fetchMoviesByTitle };
};