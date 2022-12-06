import { FC } from "react";
import "./styles.css";

interface Props {
  imgUrl: string | null;
  name: string;
  moreInfo: () => void;
}

export const Card: FC<Props> = ({ imgUrl, name, moreInfo }) => {
  return (
    <div className="card-container">
      <div className="card-pokemon-name">{name}</div>
      {imgUrl && <img src={imgUrl} alt={name} width={200} />}
      <button className="card-more-info-button" onClick={moreInfo}>
        More Info
      </button>
    </div>
  );
};
