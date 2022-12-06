import { useState, useEffect, useCallback } from "react";
import {
  MAX_ITEM,
  POKEMON_CACHE,
  POKEMON_CACHE_LAST_PAGE,
} from "../constants/contsants";
import { convertFromPokemonListResponse } from "../converters/pokemonDataConverter";
import { Pokemon } from "../types/Pokemon";
import {
  NamedAPIResource,
  PokemonResponseData,
} from "../types/PokemonResponseData";
import { usePokemonResponse } from "./usePokemonResponse";

interface PokemonData {
  loading: boolean;
  pokemonList: Pokemon[];
  lastPage: number;
  error?: string;
}

export const usePokemonList = (page: number, searchValue: string) => {
  const [state, setState] = useState<PokemonData>({
    loading: true,
    pokemonList: [],
    lastPage: 1,
    error: undefined,
  });

  const { results } = usePokemonResponse();

  const fetchPokemonList = useCallback(async () => {
    if (results.length === 0) {
      return;
    }

    try {
      const isSearch = searchValue.length > 2;
      const cachedData = !isSearch ? getCachedData(page) : undefined;

      if (cachedData && cachedData.cachedList.length > 0) {
        setState({
          loading: false,
          pokemonList: cachedData.cachedList,
          lastPage: cachedData.lastPage,
        });
      } else {
        const resultList = isSearch
          ? results.filter((r) => r.name.includes(searchValue.toLowerCase()))
          : results;

        const lastPage = Math.ceil(resultList.length / MAX_ITEM);

        const start = (page - 1) * MAX_ITEM;
        const limitedList = resultList.slice(start, start + MAX_ITEM) ?? [];

        const convertedList = await getFetchedData(limitedList);

        if (!isSearch) {
          localStorage.setItem(
            POKEMON_CACHE + page,
            JSON.stringify(convertedList)
          );
          localStorage.setItem(POKEMON_CACHE_LAST_PAGE, lastPage.toString());
        }

        setState({
          loading: false,
          pokemonList: convertedList,
          lastPage: lastPage,
        });
      }
    } catch (error) {
      console.log(error);
      setState({
        loading: false,
        pokemonList: [],
        error: "Something went wrong...",
        lastPage: 1,
      });
    }
  }, [results, page, searchValue]);

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  return state;
};

export const getCachedData = (page: number) => {
  const data = localStorage.getItem(POKEMON_CACHE + page);
  const lastPage = localStorage.getItem(POKEMON_CACHE_LAST_PAGE);
  return data
    ? { cachedList: JSON.parse(data) as Pokemon[], lastPage: Number(lastPage) }
    : { cachedList: [], lastPage: 1 };
};

export const getFetchedData = async (responseResults: NamedAPIResource[]) => {
  const dataList: PokemonResponseData[] = [];
  await Promise.all(
    responseResults.map((result) =>
      fetch(result.url).then((response) =>
        response.json().then((data) => dataList.push(data))
      )
    )
  );

  return convertFromPokemonListResponse(dataList);
};
