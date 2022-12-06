export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonResponseData {
  id: number;
  name: string;
  weight: number;
  moves: PokemonMove[];
  species: NamedAPIResource;
  stats: PokemonStat[];
  types: PokemonType[];
  sprites: PokemonSprites;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

export interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
}

export interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other?: OtherPokemonSprites;
}

export interface OtherPokemonSprites {
  "official-artwork": OfficialArtwork;
  home: Home;
}

interface OfficialArtwork {
  front_default: string | null;
}

export interface Home {
  front_default: string | null;
  front_shiny: string | null;
}
