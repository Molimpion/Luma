import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // Função para verificar o status de login
  const checkLoginStatus = () => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId); 
  };

  useEffect(() => {
    checkLoginStatus(); 
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []); 

  
  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false); 
    navigate("/home"); 
  };

  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex items-center">
        <li>
          <Link
            to="/"
            className="text-white text-xl font-bold hover:text-blue-300"
          >
            Logo
          </Link>
        </li>

        <div className="ml-auto flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-blue-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/pagina1" className="text-white hover:text-blue-300">
              Página 1
            </Link>
          </li>
          <li>
            <Link to="/pagina2" className="text-white hover:text-blue-300">
              Página 2
            </Link>
          </li>
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-blue-300"
              >
                ☰
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md">
                  <ul className="flex flex-col">
                    <li>
                      <Link
                        to="/logado"
                        className="block px-4 py-2 text-black hover:bg-gray-200"
                      >
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-black hover:bg-gray-200"
                      >
                        Opções
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-black hover:bg-gray-200"
                      >
                        Sair
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <li>
              <Link
                to="/login"
                className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md"
              >
                Entrar
              </Link>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;