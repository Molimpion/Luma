import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logado from "./pages/Logado";
import Pagina1 from "./pages/Pagina1";
import Pagina2 from "./pages/Pagina2";
import Cadastro from "./pages/Cadastro";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-6">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/logado" element={<Logado />} />
          <Route path="/pagina1" element={<Pagina1 />} />
          <Route path="/pagina2" element={<Pagina2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;