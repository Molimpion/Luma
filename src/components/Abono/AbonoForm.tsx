import React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Input,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export const AbonoForm = () => {
  const navigate = useNavigate();

  const handleEnviarClick = () => {
    console.log("Solicitação de abono enviada");
  };

  const handleAnexarDocumentoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Arquivo anexado:", file.name);
    }
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <>
      {/* Box para o título e o botão de retornar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 3,
          mb: 2,
          paddingLeft: "1.8rem",
        }}
      ></Box>

      <Box
        sx={{
          mt: 3,
          backgroundColor: "white",
          padding: 3,
          borderRadius: 3,
        }}
      >
        <IconButton onClick={handleVoltar} sx={{ mr: 1 }}>
          <ArrowBackIcon />
          <Typography fontWeight="bold" sx={{ color: "black", pl: 4, mt: -4 }}>
            Solicitar Abono
          </Typography>
        </IconButton>

        <Box
          sx={{
            backgroundColor: "rgba(105, 69, 164, 0.1)",
            padding: 3,
            borderRadius: 3,
            marginTop: 3,
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Nome do funcionário
          </Typography>
          <TextField
            value="Carlos Moraes"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "white", borderRadius: "10px" }}
            disabled
          />
          <Box sx={{ display: "flex", gap: 2, mb: 2, mt: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Data início
              </Typography>
              <TextField
                type="date"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "white", borderRadius: "10px" }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Data final
              </Typography>
              <TextField
                type="date"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "white", borderRadius: "10px" }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                Justifique-se
              </Typography>
              <TextField
                multiline
                rows={4}
                margin="normal"
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                border: "1px dashed grey",
                p: 2,
                borderRadius: 1,
                mt: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "300px",
                backgroundColor: "white",
              }}
            >
              <Typography color="rgba(105, 69, 164)">
                Link ou arraste e solte
              </Typography>
              <Typography color="textSecondary" variant="caption">
                SVG, PNG, JPG (max. 3MB)
              </Typography>
              <Input
                type="file"
                sx={{ display: "none", color: "rgba(105, 69, 164)" }}
                id="anexar-documento"
                onChange={handleAnexarDocumentoChange}
              />
              <label htmlFor="anexar-documento">
                <Button
                  component="span"
                  sx={{ mt: 1, color: "rgba(105, 69, 164)" }}
                  variant="outlined"
                  size="small"
                >
                  Anexar documento
                </Button>
              </label>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#5D3998", color: "white" }}
              onClick={handleEnviarClick}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
