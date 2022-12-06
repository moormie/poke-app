export interface Pokemon {
  id: number;
  name: string;
  imgUrl: string | null;
}

export interface PokemonDetails extends Pokemon {
  species: string;
  stats: Stat[];
  types: NamedType[];
  weightInKg: number;
  moves: NamedType[];
}

export interface NamedType {
  name: string;
}

export interface Stat extends NamedType {
  effort: number;
}
