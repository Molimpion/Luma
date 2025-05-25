import React from "react";
import { useState } from "react";
import { LeftImageSection } from "../../components/LeftSection";
import { Container } from "./styles";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Logo from "../../assets/LogoFudida.png";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

type LoginSignUpProps = {
  // eslint-disable-next-line no-unused-vars
  onLogin: (msg: string, userId: string) => void;
};

interface LoggedInUser {
  id: string;
  email: string;
  cpf: string;
  username: string;
  password?: string;
  name: string;
}

export function LoginSignUp({ onLogin }: LoginSignUpProps) {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [errorUsuario, setErrorUsuario] = useState("");
  const [errorSenha, setErrorSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Validação do campo usuário
  const validarUsuario = (value: string) => {
    if (!value.trim()) {
      return "O usuário é obrigatório";
    }
    return "";
  };

  // Validação da senha (mínimo 6 caracteres)
  const validarSenha = (value: string) => {
    if (!value) {
      return "A senha é obrigatória";
    }
    if (value.length < 6) {
      return "A senha deve ter ao menos 6 caracteres";
    }
    return "";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Limpar erros antigos
    setErrorUsuario("");
    setErrorSenha("");
    setLoginError(null);

    // Validar campos localmente
    const usuarioError = validarUsuario(usuario);
    const senhaError = validarSenha(senha);

    if (usuarioError || senhaError) {
      setErrorUsuario(usuarioError);
      setErrorSenha(senhaError);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/users?username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(senha)}`
      );

      if (!response.ok) {
        throw new Error("Erro de rede ou servidor indisponível.");
      }

      const users: LoggedInUser[] = await response.json();

      if (users.length === 0) {
        setLoginError("Credenciais inválidas. Verifique seu usuário e senha");
        return;
      }

      const loggedInUser = users[0];

      console.log("Usuário Logado", loggedInUser);
      localStorage.setItem("loggedInUserId", loggedInUser.id);
      localStorage.setItem(
        "loggedInUserName",
        loggedInUser.username || loggedInUser.email
      );

      onLogin(
        `Bem-Vindo,  ${loggedInUser.name || loggedInUser.username || loggedInUser.email}!`,
        loggedInUser.id
      );
      navigate("/app/ponto");
    } catch (err: any) {
      console.error("Erro no login:", err);
      setLoginError(err.message || "Ocorreu um erro inesperado no login.");
    }
  };

  return (
    <Container>
      <LeftImageSection />

      <div className="rightContent">
        <div className="formHeader">
          <h1>Faça login</h1>
        </div>

        <form className="loginForm" onSubmit={handleLogin}>
          <div className="inputGroup">
            <p>Por favor, informe suas credenciais de login.</p>
            <label htmlFor="usuario">Usuário:</label>
            <input
              type="text"
              id="usuario"
              placeholder="Insira seu Usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
            {errorUsuario && (
              <p
                id="usuario-error"
                style={{
                  color: "red",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                }}
              >
                {errorUsuario}
              </p>
            )}
          </div>

          <div className="inputGroup">
            <label htmlFor="senha">Senha:</label>
            <div className="inputWithIcon">
              <input
                type={showPassword ? "text" : "password"}
                id="senha"
                placeholder="Insira sua Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <VisibilityOutlinedIcon
                className="icon"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              />
            </div>
            {errorSenha && (
              <p
                id="senha-error"
                style={{
                  color: "red",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                }}
              >
                {errorSenha}
              </p>
            )}
          </div>

          <div className="rememberForgot">
            <a href="#">Esqueceu sua senha?</a>
          </div>

          {loginError && (
            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
              {loginError}
            </p>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            className="loginButton"
          >
            Vamos lá!
          </Button>
        </form>

        <div className="registerLink">
          <Divider>
            <span>ou</span>
          </Divider>
          <p className="registerTextArea">
            Não possui uma conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>

        <footer className="loginFooter">
          <a href="#">Política de Privacidade |</a>
          <a href="#"> Termos de Serviço</a>
        </footer>
      </div>
      <div className="logoWrapper">
        <img src={Logo} alt="logo da Luma" />
      </div>
    </Container>
  );
}
