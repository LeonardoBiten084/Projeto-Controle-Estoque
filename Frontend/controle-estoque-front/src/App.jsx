import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import Produtos from "./pages/Produtos";
import Cadastrar from "./pages/Cadastrar"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
      </Routes>
    </>
  );
}

export default App;
