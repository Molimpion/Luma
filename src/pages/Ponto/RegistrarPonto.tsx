import React, { useState, useEffect, useCallback, useMemo } from "react";
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

// Configuração do ícone padrão do Leaflet
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// Interface para o tipo Ponto
interface Ponto {
  id: string;
  userId: string;
  dataHora: string;
  timestamp: number;
  date: string;
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
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "info" | "error"
  >("success");

  const simulatedUserLocation = { lat: -8.05, lng: -34.9 };
  const zoomLevel = 15;

  const getTodayDateFormatted = useCallback(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const todayDate = useMemo(
    () => getTodayDateFormatted(),
    [getTodayDateFormatted]
  );

  // Efeito para buscar as marcações do dia ao carregar o componente ou mudar o userData
  useEffect(() => {
    const fetchPontosDoDia = async () => {
      if (userData?.id) {
        try {
          const response = await fetch(
            `/api/pontos?userId=${userData.id}&date=${todayDate}`
          );
          if (!response.ok) {
            throw new Error("Erro ao buscar pontos do dia");
          }
          const pontos = await response.json();
          setMarcacoesDeHoje(
            pontos.sort((a: Ponto, b: Ponto) => b.timestamp - a.timestamp)
          );
        } catch (error) {
          console.error("Erro ao carregar marcações do dia.", error);
          setSnackbarMessage("Erro ao carregar marcações de hoje");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      }
    };
    fetchPontosDoDia();
  }, [userData?.id, todayDate]);

  // Determina o tipo do próximo ponto a ser batido
  const newPontoType: "entrada" | "saida" = useMemo(() => {
    const lastPontoType =
      marcacoesDeHoje.length > 0 ? marcacoesDeHoje[0].type : "saida";
    return lastPontoType === "entrada" ? "saida" : "entrada";
  }, [marcacoesDeHoje]);

  // Handler para bater o ponto
  const handleBaterPonto = useCallback(async () => {
    if (marcacoesDeHoje.length >= 2) {
      setSnackbarMessage("Você já registrou o máximo de 2 pontos hoje");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

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
      userId: userData!.id,
      dataHora: formattedDateTime,
      timestamp: now.getTime(),
      date: todayDate,
      type: newPontoType,
    };

    try {
      const response = await fetch("/api/pontos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPonto),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar ponto.");
      }
      const registeredPonto = await response.json();
      setMarcacoesDeHoje((prev) => [registeredPonto, ...prev]);
      await updateUserCounts(newPontoType);

      setSnackbarMessage("Ponto registrado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao registrar ponto:", error);
      setSnackbarMessage("Erro ao registrar ponto.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }, [marcacoesDeHoje, userData, todayDate, newPontoType, updateUserCounts]);

  // Handler para fechar o Snackbar
  const handleCloseSnackbar = useCallback(
    (_event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") return;
      setOpenSnackbar(false);
    },
    []
  );

  // Handler para retornar à página anterior
  const handleVoltar = useCallback(() => {
    navigate("/app/ponto");
  }, [navigate]);

  // Handlers para o modal de edição
  const handleOpenEditModal = useCallback((dataHora: string) => {
    setEditedDateTime(dataHora);
    setEditModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditModalOpen(false);
    setEditedDateTime("");
  }, []);

  const handleSaveEditedPonto = useCallback(() => {
    handleCloseEditModal();
    setSnackbarMessage(
      "Solicitação de alteração enviada ao RH. Em breve retornaremos com a resposta."
    );
    setSnackbarSeverity("info");
    setOpenSnackbar(true);
  }, [handleCloseEditModal]);

  // Renderização condicional para estados de carregamento e erro
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
          flexDirection: "column",
          p: 2,
        }}
      >
        <Typography sx={{ mb: 2 }}>
          Nenhum dado de usuário disponível. Por favor, faça login novamente.
        </Typography>
        <Button onClick={() => navigate("/")}>Ir para Login</Button>
      </Box>
    );
  }

  const isPontoDisabled = marcacoesDeHoje.length >= 2;

  return (
    <>
      <Box
        component="main"
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <Greeting name={userData.name || "usuário"} />
        </Box>

        <Box
          sx={{
            mb: { xs: 2, sm: 3 },
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <UserCardInfo cardWidth="30rem" />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            mb: { xs: 2, sm: 3 },
          }}
        >
          <Divider
            orientation="vertical"
            sx={{
              height: 24,
              width: 4,
              bgcolor: "#5D3998",
              mr: 1,
              display: { xs: "none", sm: "block" },
            }}
          />
          <Typography variant="subtitle1" color="textSecondary">
            Registrar Ponto
          </Typography>
        </Box>

        <Paper
          sx={{
            width: "100%",
            borderRadius: 2,
            p: { xs: 2, sm: 3 },
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
          elevation={3}
        >
          <IconButton
            onClick={handleVoltar}
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              p: { xs: 1, sm: 1.5 },
            }}
          >
            <ArrowBack />
          </IconButton>

          <Box sx={{ mt: { xs: 4, sm: 6 } }}>
            <Typography variant="h6" gutterBottom>
              Registrar ponto
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "minmax(400px, 1fr) 2fr",
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
                  borderRadius: 2,
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
                      width: { xs: 120, sm: 140, md: 150 },
                      height: { xs: 120, sm: 140, md: 150 },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      bgcolor: "primary.main",
                      color: "white",
                      cursor: isPontoDisabled ? "not-allowed" : "pointer",
                      background: isPontoDisabled
                        ? "lightgray"
                        : "linear-gradient(180deg, #5D3998 0%, #8E6CAC 100%)",
                    }}
                    onClick={isPontoDisabled ? undefined : handleBaterPonto}
                    elevation={3}
                  >
                    <Typography fontWeight="bold" variant="h6">
                      Bater ponto
                    </Typography>
                  </Paper>
                </Box>
                {isPontoDisabled && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 1, textAlign: "center" }}
                  >
                    Você já registrou o máximo de 2 pontos hoje.
                  </Typography>
                )}
              </Paper>

              <Box
                sx={{
                  gridRow: { xs: "2", md: "1" },
                  gridColumn: { xs: "1", md: "2" },
                  height: { xs: 200, sm: 300, md: 400 },
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
                    flexWrap: "wrap",
                    lineHeight: "1.5",
                    mt: 1,
                    gap: 1,
                  }}
                >
                  <Typography mr={1}>08:00</Typography>
                  <Typography>-----</Typography>
                  <Typography mx={1}>12:00</Typography>
                  <Typography>----</Typography>
                  <RestaurantOutlined
                    sx={{
                      mx: 1,
                      verticalAlign: "middle",
                      fontSize: { xs: 20, sm: 24 },
                    }}
                  />
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

      <Dialog open={editModalOpen} onClose={handleCloseEditModal} fullWidth>
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
