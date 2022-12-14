import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { POKEMON_URL } from "./constants/contsants";

import { HomePage } from "./pages/Home";
import { PokemonDetailsPage } from "./pages/PokemonDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={POKEMON_URL} element={<HomePage />} />
        <Route path={`${POKEMON_URL}/:name`} element={<PokemonDetailsPage />} />
        <Route path="*" element={<Navigate to={`${POKEMON_URL}?page=1`} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
