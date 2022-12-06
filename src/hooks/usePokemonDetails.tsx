import { useState, useEffect, useCallback } from "react";
import { BASE_URL, POKEMON_DETAILS_ } from "../constants/contsants";
import { convertFromPokemonResponse } from "../converters/pokemonDataConverter";
import { PokemonDetails } from "../types/Pokemon";
import { PokemonResponseData } from "../types/PokemonResponseData";

interface Data {
  loading: boolean;
  pokemon?: PokemonDetails;
  error?: string;
}

export const usePokemonDetails = (name?: string) => {
  const [state, setState] = useState<Data>({
    loading: true,
  });

  const fetchPokemonDetails = useCallback(async () => {
    if (!name) {
      return;
    }

    try {
      const cachedPokemon = getCachedData(name);
      if (cachedPokemon) {
        setState({
          loading: false,
          pokemon: cachedPokemon,
        });
      } else {
        const convertedData = await getFetchedData(name);
        localStorage.setItem(
          POKEMON_DETAILS_ + name,
          JSON.stringify(convertedData)
        );
        setState({
          loading: false,
          pokemon: convertedData,
        });
      }
    } catch (error) {
      console.log(error);
      setState({
        loading: false,
        error: "Something went wrong...",
      });
    }
  }, [name]);

  useEffect(() => {
    fetchPokemonDetails();
  }, [fetchPokemonDetails]);

  return state;
};

const getCachedData = (name: string) => {
  const data = localStorage.getItem(POKEMON_DETAILS_ + name);
  return data ? (JSON.parse(data) as PokemonDetails) : null;
};

const getFetchedData = async (name: string) => {
  const data: PokemonResponseData = await (
    await fetch(`${BASE_URL}/${name}`)
  ).json();

  const convertedData: PokemonDetails = convertFromPokemonResponse(data);

  return convertedData;
};
