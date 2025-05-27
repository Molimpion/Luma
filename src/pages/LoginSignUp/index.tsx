import React, { useState } from "react";
import { LeftImageSection } from "../../components/LeftSection";
import { Container } from "./styles";

import { AlertColor, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "@mui/material/Button";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../../assets/LogoFudida.png";
import { useNavigate } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Link } from "react-router-dom";
import { ArrowBackIosOutlined as ArrowBack } from "@mui/icons-material";

const CustomAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  function CustomAlert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

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
        `/api/users?username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(senha)}`
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

  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarseverity, setSnackbarSeverity] =
    useState<AlertColor>("success");

  const showSnackbar = (message: string, severity: AlertColor = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const verificarEmailExistente = async () => {
    try {
      const response = await fetch(
        `/api/users?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();
      if (!email.trim()) {
        showSnackbar("Por favor, insira um e-mail válido.", "warning");
        return;
      }

      if (data.length > 0) {
        showSnackbar(
          "Link de recuperação enviado para o seu e-mail.",
          "success"
        );
        setForgotPasswordOpen(false);
      } else {
        showSnackbar(
          "E-mail não encontrado. Verifique e tente novamente.",
          "error"
        );
      }
    } catch (error) {
      console.error("Erro ao verificar o e-mail:", error);
      showSnackbar(
        "Erro ao verificar o e-mail. Tente novamente mais tarde.",
        "error"
      );
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
        <Typography
          variant="body2"
          sx={{ cursor: "pointer", mt: 1, pl: 30 }}
          color="primary"
          onClick={() => setForgotPasswordOpen(true)}
        >
          Esqueceu sua senha?
        </Typography>

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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <CustomAlert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarseverity}
        >
          {snackbarMessage}
        </CustomAlert>
      </Snackbar>

      <Dialog
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        PaperProps={{
          sx: {
            width: "700px",
            height: "450px",
            maxWidth: "90vw",
            padding: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            mt: 1,
            fontSize: "1.5rem",
            textDecoration: "underline",
          }}
        >
          Esqueceu sua senha?
        </DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "#5d3998",
            mb: 1.5,
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 80 }} />
        </Box>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
          }}
        >
          Digite o e-mail cadastrado e enviaremos um link para que possa
          redefinir sua senha.
        </Typography>
        <DialogContent>
          <span>Email:</span>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Insira seu e-mail"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Box
            sx={{
              top: 8,
              right: 8,
              position: "absolute",
            }}
          >
            <Button
              onClick={() => setForgotPasswordOpen(false)}
              sx={{
                color: "#5d3998",
                "&:hover": {
                  backgroundColor: "#ffffff",
                },
              }}
            >
              <ArrowBack />
            </Button>
            <Typography>Retornar</Typography>
          </Box>

          <Button
            onClick={verificarEmailExistente}
            variant="contained"
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "10rem",
              borderRadius: "20px",
              backgroundColor: "#5d3998",
              "&:hover": {
                backgroundColor: "#7c4cc9",
              },
            }}
          >
            Enviar link
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
