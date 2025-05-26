import React, { useState } from "react";
import { RightImageSection } from "../../components/RightSection";
import { Container } from "./style";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Logo from "../../assets/LogoFudida.png";

import { Link, useNavigate } from "react-router-dom";

type CadastroSignUpProps = {
  // eslint-disable-next-line no-unused-vars
  onRegister: (msg: string) => void;
};

export function CadastroSignUp({ onRegister }: CadastroSignUpProps) {
  const navigate = useNavigate();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }
    if (!nomeCompleto || !cpf || !username || !email || !senha) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const newUser = {
      nome: nomeCompleto,
      cpf: cpf,
      username: username,
      email: email,
      password: senha,
      descricao: "Novo Colaborador",
      avatar: "",
      entradas: 0,
      saidas: 0,
      faltas: 0,
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao registrar usuário.");
      }

      const registerUser = await response.json();
      console.log("Usuário registrado com sucesso:", registerUser);

      onRegister("Usuário registrado com sucesso!");

      navigate("/");
    } catch (err: any) {
      console.error("Erro no cadastro", err.message);
      setError(err.message || "Ocorreu um erro no cadastro. Tente novamente");
    }
  };
  // const handleCadastro = () => {
  //   onRegister("Usuário Registrado!");
  //   navigate("/CadastroSignUp");
  // };

  return (
    <Container>
      <div className="logoWrapper">
        <img src={Logo} alt="Logo da Luma" />
      </div>

      <div className="leftContent">
        <div className="formHeader">
          <h1>Crie sua conta</h1>
          <p>Preencha os campos para se cadastrar.</p>
        </div>

        <form className="signUpForm" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="nome">Nome completo:</label>
            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome"
              required
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              placeholder="Digite seu CPF"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="username">Nome de usuário:</label>
            <input
              type="text"
              id="username"
              placeholder="Escolha um nome de usuário"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="senha">Senha:</label>
            <div className="inputWithIcon">
              <input
                type="password"
                id="senha"
                placeholder="Crie uma senha"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <VisibilityOutlinedIcon className="icon" />
            </div>
          </div>

          <div className="inputGroup">
            <label htmlFor="confirmarSenha">Confirmar senha:</label>
            <div className="inputWithIcon">
              <input
                type="password"
                id="confirmarSenha"
                placeholder="Confirme sua senha"
                required
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
              <VisibilityOutlinedIcon className="icon" />
            </div>
          </div>
          {error && (
            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
              {error}
            </p>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            className="registerButton"
          >
            Cadastrar
          </Button>

          <div className="loginLink">
            <Divider>
              <span>ou</span>
            </Divider>
            <p className="registerTextArea">
              Já tem uma conta? <Link to="/">Faça login</Link>
            </p>
          </div>

          <footer className="loginFooter">
            <a href="#">Política de Privacidade |</a>
            <a href="#"> Termos de Serviço</a>
          </footer>
        </form>
      </div>

      <RightImageSection />
    </Container>
  );
}
