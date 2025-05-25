import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  SnackbarCloseReason,
} from "@mui/material";
import {
  ArrowBackIosOutlined as ArrowBack,
  RestaurantOutlined,
  Edit as EditIcon,
} from "@mui/icons-material";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useNavigate } from "react-router-dom";

import { UserCardInfo } from "../../components/UserInfo";
import { Greeting } from "../../components/saudacao";
import { useUser } from "../../hooks/useUser";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Ponto {
  id: string;
  dataHora: string;
  timestamp: number;
  type: "entrada" | "saida";
}

export function RegistrarPonto() {
  const navigate = useNavigate();
  const { userData, loadingUser, errorUser, updateUserCounts } = useUser();

  const [marcacoesDeHoje, setMarcacoesDeHoje] = useState<Ponto[]>([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedDateTime, setEditedDateTime] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "info">(
    "success"
  );

  const simulatedUserLocation = { lat: -8.05, lng: -34.9 };
  const zoomLevel = 15;

  const lastPontoType =
    marcacoesDeHoje.length > 0 ? marcacoesDeHoje[0].type : "saida";
  const newPontoType: "entrada" | "saida" =
    lastPontoType === "entrada" ? "saida" : "entrada";

  const handleBaterPonto = async () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const formattedDateTime = now
      .toLocaleDateString("pt-BR", options)
      .replace(",", " |");

    const newPonto: Ponto = {
      id: now.getTime().toString(),
      dataHora: formattedDateTime,
      timestamp: now.getTime(),
      type: newPontoType,
    };

    setMarcacoesDeHoje((prev) => [newPonto, ...prev]);
    await updateUserCounts(newPontoType);

    setSnackbarMessage("Ponto registrado com sucesso!");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const handleVoltar = () => {
    navigate("/app/ponto");
  };

  const handleOpenEditModal = (dataHora: string) => {
    setEditedDateTime(dataHora);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);

    setEditedDateTime("");
  };

  const handleSaveEditedPonto = () => {
    handleCloseEditModal();
    setSnackbarMessage(
      "Solicitação de alteração enviada ao RH. Em breve retornaremos com a resposta."
    );
    setSnackbarSeverity("info");
    setOpenSnackbar(true);
  };

  if (loadingUser) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Carregando dados do usuário...</Typography>
      </Box>
    );
  }
  if (errorUser) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">{errorUser}</Typography>
      </Box>
    );
  }
  if (!userData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>
          Nenhum dado de usuário disponível. Por favor, faça login novamente.
        </Typography>
        <Button onClick={() => navigate("/")}>Ir para Login</Button>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "2.5rem",
        }}
      >
        <Box sx={{ marginBottom: "2.5rem", marginLeft: 3 }}>
          <Greeting name={userData.name || "usuário"} />
        </Box>
      </Box>

      <Box
        sx={{ marginLeft: "1.7rem", marginTop: "-4.5rem", pr: 3.5, pl: 1.5 }}
      >
        <UserCardInfo {...userData} cardWidth="100%" />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 3,
          mb: -3,
          paddingLeft: "1.8rem",
        }}
      >
        <Divider
          orientation="vertical"
          sx={{
            height: "20px",
            width: "3px",
            bgcolor: "#5D3998",
            mr: 0.5,
          }}
        />
        <Typography variant="subtitle1" color="textSecondary">
          Registrar Ponto
        </Typography>
      </Box>

      <Box
        sx={{
          padding: 3,
          mr: 1,
          ml: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: { xs: "100%", lg: "100%" },
            maxWidth: "100%",
            flexShrink: 0,
            borderRadius: "10px",
            padding: 3,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            mt: 2,
          }}
        >
          <IconButton
            onClick={handleVoltar}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <ArrowBack />
            <Typography>Retornar</Typography>
          </IconButton>

          <Typography variant="h5" fontWeight="bold" mb={2}>
            Registrar ponto
          </Typography>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Registrar ponto
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "480px 1fr",
                },
                gridTemplateRows: {
                  xs: "auto auto auto",
                  md: "1fr auto",
                },
                mb: 2,
              }}
            >
              <Paper
                sx={{
                  gridRow: { xs: "1", md: "1 / 3" },
                  gridColumn: "1",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "10px",
                  p: 2,
                  background: "rgba(105, 69, 164, 0.13)",
                  border: "1px solid #5D3998",
                }}
              >
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    MARCAÇÕES DE HOJE
                  </Typography>
                  <Divider sx={{ mb: 1, mt: 2, background: "#5D3998" }} />
                  {marcacoesDeHoje.length > 0 ? (
                    marcacoesDeHoje.map((ponto) => (
                      <Box
                        key={ponto.id}
                        sx={{
                          backgroundColor: "white",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          p: "0.5rem 1rem",
                          mb: 1,
                        }}
                      >
                        <Typography>{ponto.dataHora}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenEditModal(ponto.dataHora)}
                          aria-label="editar"
                        >
                          <EditIcon sx={{ color: "#5D3998" }} />
                        </IconButton>
                      </Box>
                    ))
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        p: "0.5rem 1rem",
                        mb: 1,
                      }}
                    >
                      <Typography>Nenhuma marcação registrada hoje.</Typography>
                    </Box>
                  )}
                  <Divider sx={{ mb: 1, mt: 1, background: "#5D3998" }} />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Paper
                    sx={{
                      borderRadius: "50%",
                      width: 150,
                      height: 150,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      bgcolor: "primary.main",
                      color: "white",
                      cursor: "pointer",
                      background:
                        "linear-gradient(180deg, #5D3998 0%, #8E6CAC 100%)",
                    }}
                    onClick={handleBaterPonto}
                  >
                    <Typography fontWeight="bold" variant="h6">
                      Bater ponto
                    </Typography>
                  </Paper>
                </Box>
              </Paper>

              <Box
                sx={{
                  gridRow: "1",
                  gridColumn: { xs: "1", md: "2" },
                  height: { xs: "300px", md: "400px" },
                  borderRadius: "10px",
                  border: "1px solid #5D3998",
                  overflow: "hidden",
                }}
              >
                <MapContainer
                  center={simulatedUserLocation}
                  zoom={zoomLevel}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={simulatedUserLocation}>
                    <Popup>Você está aqui!</Popup>
                  </Marker>
                </MapContainer>
              </Box>

              <Paper
                sx={{
                  gridRow: { xs: "3", md: "2" },
                  gridColumn: { xs: "1", md: "2" },
                  borderRadius: "10px",
                  p: 2,
                  border: "1px solid #5D3998",
                  background: "rgba(105, 69, 164, 0.13)",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  ESCALA DE HOJE
                </Typography>
                <Divider sx={{ mb: 1, mt: 2, background: "#5D3998" }} />
                <Typography>Horário Esperado</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    lineHeight: "1.5",
                    mt: 1,
                  }}
                >
                  <Typography mr={1}>08:00</Typography>
                  <Typography>-----</Typography>
                  <Typography mx={1}>12:00</Typography>
                  <Typography>----</Typography>
                  <RestaurantOutlined sx={{ mx: 1, verticalAlign: "middle" }} />
                  <Typography>----</Typography>
                  <Typography mx={1}>13:00</Typography>
                  <Typography>-----</Typography>
                  <Typography ml={1}>18:00</Typography>
                </Box>
              </Paper>
            </Box>
          </Box>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </Box>

      <Dialog open={editModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Solicitar Correção de Ponto</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="edited-datetime"
            label="Nova Data e Hora"
            type="text"
            fullWidth
            variant="standard"
            value={editedDateTime}
            onChange={(e) => setEditedDateTime(e.target.value)}
            helperText="Formato sugerido: Quarta-feira | 09:10:12"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancelar</Button>
          <Button onClick={handleSaveEditedPonto} variant="contained">
            Enviar Solicitação
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
