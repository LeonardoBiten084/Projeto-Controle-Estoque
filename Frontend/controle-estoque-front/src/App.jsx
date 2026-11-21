import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import Produtos from "./pages/Produtos";
import NovoProduto from "./pages/novo-produto"
import Registros from "./pages/Registros";
import NovoRegistro from "./pages/novo-registro";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/novo-produto" element={<NovoProduto />} />
        <Route path="/registros" element={<Registros />} />
        <Route path="/novo-registro" element={<NovoRegistro />} />
      </Routes>
    </>
  );
}

export default App;
