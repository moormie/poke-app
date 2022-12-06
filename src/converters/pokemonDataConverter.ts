import { NamedType, Pokemon, PokemonDetails, Stat } from "../types/Pokemon";
import { PokemonResponseData } from "./../types/PokemonResponseData";

export const convertFromPokemonResponse = (
  data: PokemonResponseData
): PokemonDetails => {
  const statList: Stat[] = data.stats.map((s) => ({
    name: s.stat.name,
    effort: s.base_stat,
  }));

  const typeList: NamedType[] = data.types.map((t) => ({
    name: t.type.name,
  }));

  const moveList: NamedType[] = data.moves.map((m) => ({
    name: m.move.name,
  }));
  return {
    id: data.id,
    name: data.name,
    imgUrl:
      data.sprites.other?.["official-artwork"].front_default ??
      data.sprites.front_default,
    species: data.species.name,
    weightInKg: data.weight / 10,
    stats: statList,
    types: typeList,
    moves: moveList,
  };
};

export const convertFromPokemonListResponse = (
  dataList: PokemonResponseData[]
): Pokemon[] => {
  return dataList.map((data) => ({
    id: data.id,
    name: data.name,
    imgUrl:
      data.sprites.other?.["official-artwork"].front_default ??
      data.sprites.other?.home.front_default ??
      data.sprites.other?.home.front_shiny ??
      data.sprites.front_default,
  }));
};
