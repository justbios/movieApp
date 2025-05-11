import { FC } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router";

interface ISearchButtonProps {
  label: string;
  to?: string;
  onClick?: () => void;
}

export const SearchButton: FC<ISearchButtonProps> = ({
  label,
  to,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();

    if (to) navigate(to);
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {label}
    </button>
  );
};
