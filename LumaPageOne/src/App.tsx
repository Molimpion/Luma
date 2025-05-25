import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { defaultTheme } from "./styles/themes/default";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";

import { DefaultLayout } from "./components/MainLayout/DefaultLayout";
import { Home } from "./pages/Home";
import { PontoPage } from "./pages/Ponto/PontoPage";
import { RegistrarPonto } from "./pages/Ponto/RegistrarPonto";
import { LoginSignUp } from "./pages/LoginSignUp";
import { CadastroSignUp } from "./pages/CadastroSignUp";

import { UserProvider } from "./contexts/UserProvider";
import { PrivateRoute } from "./components/privateRoute/PrivateRoute";
import { EspelhoPontoPage } from "./pages/EspelhoPonto";
import { SolicitarAbonoPage } from "./pages/Abono";

export function App() {
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(
    localStorage.getItem("loggedInUserId")
  );
  const handleLoginSuccess = (msg: string, userId: string) => {
    console.log(msg);
    setLoggedInUserId(userId);
  };

  const handleRegisterSuccess = (msg: string) => {
    console.log(msg);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* Rotas de Autenticação */}
          <Route
            path="/"
            element={<LoginSignUp onLogin={handleLoginSuccess} />}
          />
          <Route
            path="/cadastro"
            element={<CadastroSignUp onRegister={handleRegisterSuccess} />}
          />

          {/* Rotas Protegidas (dentro do defaultLayout) */}
          <Route
            path="/app/*"
            element={
              <PrivateRoute>
                {loggedInUserId ? (
                  <UserProvider userId={loggedInUserId}>
                    <DefaultLayout />
                  </UserProvider>
                ) : null}
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="inicio" replace />} />
            <Route path="inicio" element={<Home />} />
            <Route path="ponto" element={<PontoPage />} />
            <Route path="ponto/registrar" element={<RegistrarPonto />} />
            <Route path="ponto/espelhoponto" element={<EspelhoPontoPage />} />
            <Route
              path="ponto/solicitarabono"
              element={<SolicitarAbonoPage />}
            />
          </Route>

          <Route
            path="*"
            element={
              loggedInUserId ? (
                <Navigate to="/app/inicio" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
