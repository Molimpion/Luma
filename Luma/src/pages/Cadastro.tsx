import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [concordoComOsTermos, setConcordoComOsTermos] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !cpf || !usuario || !email || !senha || !confirmarSenha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    if (!concordoComOsTermos) {
      setErrorMessage("Você precisa concordar com os termos.");
      return;
    }

    const newUser = {
      nome,
      cpf,
      usuario,
      email,
      senha,
      concordoComOsTermos,
    };

    // Enviar o novo usuário para o JSON Server
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      console.log("Novo usuário cadastrado com sucesso!");
      navigate("/login"); // Redirecionar para a página de login
    } else {
      setErrorMessage("Erro ao cadastrar o usuário.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Cadastro</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={concordoComOsTermos}
              onChange={() => setConcordoComOsTermos(!concordoComOsTermos)}
              className="form-checkbox"
            />
            <span className="ml-2 text-sm text-gray-700">Concordo com os termos</span>
          </label>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Cadastrar
        </button>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:text-blue-700 text-sm underline">
            Já possui uma conta? Faça login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;