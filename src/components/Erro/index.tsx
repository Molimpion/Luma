import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link, useNavigate } from "react-router-dom";

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
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
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "#5D3998" }} />
        <Typography variant="h4" gutterBottom>
          Oops! Algo deu errado.
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          A página que você tentou acessar não foi encontrada ou ocorreu um erro
          inesperado.
        </Typography>
        <Button
          variant="contained"
          onClick={() => window.history.back()}
          sx={{
            backgroundColor: "#5D3998",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#FFFFFF",
              color: "#5D3998",
            },
          }}
        >
          Voltar para a página inicial
        </Button>

        <Typography variant="caption" color="textSecondary">
          Se o problema persistir, entre em contato com{" "}
          <Link
            href="mailto:suporte.luma@luma.com.br"
            sx={{
              color: "#5D3998",
              textDecoration: "underline",
            }}
          >
            suporte.luma@luma.com.br
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};
