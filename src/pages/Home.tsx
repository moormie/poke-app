import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import { Loading } from "../components/Loading/Loading";
import { CardList } from "../components/CardList/CardList";

export const HomePage = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  const { loading, pokemonList, lastPage, error } = usePokemonList(
    page,
    searchValue
  );

  const onChangeSearch = (value: string) => {
    page !== 1 && setPage(1);
    setSearchValue(value);
  };

  const onNext = () => {
    setPage((prevState) => prevState + 1);
  };

  const onPrev = () => {
    page > 0 && setPage((prevState) => prevState - 1);
  };

  const selectPokemon = (name: string) => {
    navigate("/details/" + name);
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
