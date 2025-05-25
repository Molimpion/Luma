import React from "react";
import { TextField, Button, Typography, Box, Input } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const AbonoForm = () => {
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

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h6"
        sx={{ display: "flex", alignItems: "center", mb: 2 }}
      >
        <ArrowBackIcon sx={{ mr: 1 }} /> Solicitar Abono
      </Typography>
      <TextField
        label="Nome do funcionário"
        value="Carlos Moraes"
        fullWidth
        margin="normal"
        disabled
      />
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Data início"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Data final"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <TextField
        label="Justifique-se"
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <Box
        sx={{
          border: "1px dashed grey",
          p: 2,
          borderRadius: 1,
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="textSecondary">Link ou arraste e solte</Typography>
        <Typography color="textSecondary" variant="caption">
          SVG, PNG, JPG (max. 3MB)
        </Typography>
        <Input
          type="file"
          sx={{ display: "none" }}
          id="anexar-documento"
          onChange={handleAnexarDocumentoChange}
        />
        <label htmlFor="anexar-documento">
          <Button
            component="span"
            sx={{ mt: 1 }}
            variant="outlined"
            size="small"
          >
            Anexar documento
          </Button>
        </label>
      </Box>
      <Button variant="contained" onClick={handleEnviarClick} sx={{ mt: 3 }}>
        Enviar
      </Button>
    </Box>
  );
};
