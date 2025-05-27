// src/components/ErrorPage/ErrorPage.tsx
import React from "react";
import { Box, Typography, Button, Container, Link } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom"; // Importe useNavigate se estiver usando React Router v6

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate(); // Hook do React Router v6 para navegação

  const handleGoHome = () => {
    navigate("/"); // Navega para a página inicial (ajuste o caminho conforme sua rota inicial)
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main" }} />
        <Typography variant="h4" gutterBottom>
          Oops! Algo deu errado.
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          A página que você tentou acessar não foi encontrada ou ocorreu um erro
          inesperado.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Voltar para a página inicial
        </Button>
        <Typography variant="body2" color="textSecondary">
          Ou{" "}
          <Link
            component="button"
            onClick={() => window.history.back()}
            sx={{ cursor: "pointer" }}
          >
            voltar para a página anterior
          </Link>
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Se o problema persistir, entre em contato com o suporte.
        </Typography>
      </Box>
    </Container>
  );
};
