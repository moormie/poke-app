import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/Home";
import { PokemonDetailsPage } from "./pages/PokemonDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:name" element={<PokemonDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
