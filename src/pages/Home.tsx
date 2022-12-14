import "../App.css";
import { useNavigate } from "react-router-dom";
import { usePokemonList } from "../hooks/usePokemonList";
import { Loading } from "../components/Loading/Loading";
import { CardList } from "../components/CardList/CardList";
import { useCustomParams } from "../hooks/useCustomParams";
import { POKEMON_URL } from "../constants/contsants";

export const HomePage = () => {
  const navigate = useNavigate();

  const { params, setParams } = useCustomParams();
  const { page, search } = params;

  const { loading, pokemonList, lastPage, error } = usePokemonList(
    params.page,
    params.search ?? ""
  );

  const onChangeSearch = (value: string) => {
    if (value.length > 2) {
      setParams({ page: 1, search: value });
    } else if (value.length === 0) {
      setParams({ page: 1 });
    }
  };

  const onNext = () => {
    setParams({ page: page + 1, search: search });
  };

  const onPrev = () => {
    page > 0 && setParams({ page: page - 1, search: search });
  };

  const selectPokemon = (name: string) => {
    navigate(`${POKEMON_URL}/${name}`);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="Home-page-search-container">
        <input
          className="Home-page-search-input"
          placeholder="Search Pokémon"
          type="text"
          onChange={(e) => onChangeSearch(e.target.value)}
        />
      </div>
      <div className="page-container">
        {error && <h4>{error}</h4>}
        <CardList
          pokemonList={pokemonList.sort((a, b) => a.name.localeCompare(b.name))}
          selectPokemon={selectPokemon}
        />
        {pokemonList.length > 0 && (
          <div className="Home-page-pagination">
            <button
              className="page-button"
              onClick={onPrev}
              disabled={page < 2}
            >
              Previous
            </button>
            <p>{page}</p>
            <button
              className="page-button"
              onClick={onNext}
              disabled={page === lastPage}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};
