import { FC } from "react";
import { Pokemon } from "../../types/Pokemon";
import { Card } from "../Card/Card";
import "./styles.css";

interface Props {
  pokemonList: Pokemon[];
  selectPokemon: (name: string) => void;
}

export const CardList: FC<Props> = ({ pokemonList, selectPokemon }) => {
  return (
    <div className="pokemon-list-container">
      {pokemonList.length === 0 && <div>No result...</div>}
      {pokemonList.map((pokemon) => (
        <Card
          key={pokemon.name}
          moreInfo={() => selectPokemon(pokemon.name)}
          name={pokemon.name}
          imgUrl={pokemon.imgUrl}
        />
      ))}
    </div>
  );
};
