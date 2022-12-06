import { useParams, useNavigate } from "react-router-dom";
import { Details } from "../components/Details/Details";
import { Loading } from "../components/Loading/Loading";
import { usePokemonDetails } from "../hooks/usePokemonDetails";

export const PokemonDetailsPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const { pokemon, loading, error } = usePokemonDetails(name);

  const onClickBack = () => {
    navigate(-1);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="page-container">
      <button className="page-button" onClick={onClickBack}>
        Back
      </button>
      {pokemon && <Details pokemon={pokemon} />}
      {error && <p>{error}</p>}
    </div>
  );
};
