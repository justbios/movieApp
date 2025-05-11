import axios from "axios";
import { IMovieData } from "../context/MovieDataContext";
import { API_KEY, BASE_URL } from "../utils/const";

export const searchMovie = async (title: string) => {
    return await axios.get<{ results: IMovieData[] }>(`${BASE_URL}/search/movie`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        },
        params: {
          query: title,
        },
      });
}