import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./styles.module.css";
import { useMovieData } from "../../context/MovieDataContext";

export const FileUploader: FC = () => {
  const { setMovieTitles } = useMovieData();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const lines =
            reader.result
              ?.toString()
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line !== "") || [];
          setMovieTitles(lines);
        };
        reader.readAsText(file);
      });
    },
    [setMovieTitles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
    },
  });

  const dropMess = isDragActive
    ? "Drop the files here ..."
    : "Drag 'n' drop some .txt files here, or click to select files";

  return (
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps()} />
      <p className={styles.dropText}>{dropMess}</p>
    </div>
  );
};
