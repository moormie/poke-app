import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/contsants";
import { NamedAPIResource } from "../types/PokemonResponseData";

interface Response {
  results: NamedAPIResource[];
  loading: boolean;
}

export const usePokemonResponse = () => {
  const [state, setState] = useState<Response>({
    loading: true,
    results: [],
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    fetch(`${BASE_URL}?limit=1154`)
      .then((response) => response.json())
      .then((data: Response) =>
        setState({
          results: data.results.sort((a, b) => a.name.localeCompare(b.name)),
          loading: false,
        })
      )
      .catch((error) => {
        console.log(error);
        setState({
          loading: false,
          results: [],
        });
      });
  }, []);

  return state;
};
