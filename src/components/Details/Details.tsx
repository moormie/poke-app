import { FC } from "react";
import { PokemonDetails } from "../../types/Pokemon";
import "./styles.css";

interface Props {
  pokemon: PokemonDetails;
}

export const Details: FC<Props> = ({ pokemon }) => {
  const { name, imgUrl, species, stats, types, weightInKg, moves } = pokemon;

  return (
    <div className="Details-container">
      <div className="Details-details-container Details-pokemon-container">
        <p>
          <b>{name}</b>
        </p>
        {imgUrl && <img src={imgUrl} alt={name} />}
      </div>
      <div className="Details-details-container">
        <h2>Details</h2>
        <p>Weight: {weightInKg} kg</p>
        <p>Species: {species}</p>
        <h4>Stats</h4>
        <div className="Details-stats-container">
          {stats.map((s) => (
            <div
              key={s.name + s.effort}
              className="Details-stats-item-container"
            >
              <div>{s.name}</div>
              <div>{s.effort}</div>
            </div>
          ))}
        </div>
        <h4>Types</h4>
        <div className="Details-list-container">
          {types.map((t, index) => (
            <div key={t.name + index} className="Details-chip">
              {t.name}{" "}
            </div>
          ))}
        </div>
        <h4>Moves</h4>
        <div className="Details-list-container">
          {moves.map((m, index) => (
            <div key={m.name + index} className="Details-chip">
              {m.name.replaceAll("-", " ")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
