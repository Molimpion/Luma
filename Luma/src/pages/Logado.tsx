import React, { useEffect, useState } from "react";
import { User } from "../interfaces/User";

const Logado: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      fetch(`http://localhost:3001/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do usuário:", error);
        });
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Carregando dados do usuário...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo à página logada!</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
        <h2 className="text-2xl font-semibold">Dados do Usuário</h2>
        <p><strong>Nome:</strong> {userData.nome}</p>
        <p><strong>CPF:</strong> {userData.cpf}</p>
        <p><strong>Nome de Usuário:</strong> {userData.nomeUsuario}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Concorda com os termos:</strong> {userData.concordoComOsTermos ? "Sim" : "Não"}</p>
      </div>
    </div>
  );
};

export default Logado;