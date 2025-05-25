import { Box, Divider, Typography, Button } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Greeting } from "../../components/saudacao";
import { UserCardInfo } from "../../components/UserInfo";
import {
  CalendarSection,
  MonthlyFrequencyChart,
} from "../../components/content/HomePageContent";
import { capitalizeEachWord } from "../../utils/formatName";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { userData, loadingUser, errorUser } = useUser();
  const navigate = useNavigate();

  if (loadingUser) {
    return <Box>Carregando dados do usuário...</Box>;
  }
  if (errorUser) {
    return <Box color="error.main">Erro: {errorUser}</Box>;
  }
  if (!userData) {
    return <Box>Nenhum dado de usuário disponível.</Box>;
  }

  const displayName = capitalizeEachWord(userData.name || userData.username);

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
          <Greeting name={displayName} />
        </Box>
      </Box>

      <Box
        sx={{ marginLeft: "1.7rem", marginTop: "-4.5rem", pr: 3.5, pl: 1.5 }}
      >
        <UserCardInfo {...userData} cardWidth="100%" />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gridTemplateRows: { xs: "auto auto auto", md: "auto auto" },
          gap: 4,
          mt: { xs: 4, md: 6 },
          px: 3,
        }}
      >
        {/* Início & Mais Acessados */}
        <Box
          sx={{
            gridColumn: "1",
            gridRow: "1",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              mt: -3,
              ml: 1.2,
            }}
          >
            <Divider
              orientation="vertical"
              sx={{ height: 20, width: 3, bgcolor: "#5D3998", mr: 1 }}
            />
            Início
          </Typography>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              p: 5,
              display: "flex",
              flexDirection: "column",
              minHeight: 448,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                mb: 2,
              }}
            >
              <Divider
                orientation="vertical"
                sx={{ height: 20, width: 3, bgcolor: "#5D3998", mr: 1 }}
              />
              <Typography variant="h6">Mais Acessados</Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate("/app/ponto/registrar")}
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
                    textTransform: "none",
                    width: "100%",
                    height: "8rem",
                    flexDirection: "column",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <AccessTimeOutlinedIcon
                    sx={{ fontSize: 40, color: "#5D3998" }}
                  />
                  <Typography>Batida de Ponto</Typography>
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
                    textTransform: "none",
                    width: "100%",
                    flexDirection: "column",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <WalletOutlinedIcon sx={{ fontSize: 40, color: "#5D3998" }} />
                  <Typography>Envelope de Pagamento</Typography>
                </Button>
                <Button
                  onClick={() => navigate("/app/ponto/solicitarabono")}
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
                    textTransform: "none",
                    width: "100%",
                    flexDirection: "column",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <EditNoteOutlinedIcon
                    sx={{ fontSize: 40, color: "#5D3998" }}
                  />
                  <Typography>Solicitar Abono</Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Calendário */}
        <Box sx={{ gridColumn: { xs: "1", md: "2" }, gridRow: "1", pt: 1.2 }}>
          <Box sx={{ backgroundColor: "white", borderRadius: 2, p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Divider
                orientation="vertical"
                sx={{ height: 20, width: 3, bgcolor: "#5D3998", mr: 1 }}
              />
              <Typography variant="h6">Calendário</Typography>
            </Box>
            <CalendarSection />
          </Box>
        </Box>

        {/* Frequência Mensal */}
        <Box sx={{ gridColumn: "1", gridRow: "2" }}>
          <Box sx={{ backgroundColor: "white", borderRadius: 2, p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Divider
                orientation="vertical"
                sx={{ height: 20, width: 3, bgcolor: "#5D3998", mr: 1 }}
              />
              <Typography variant="h6">Frequência Mensal</Typography>
            </Box>
            <MonthlyFrequencyChart />
          </Box>
        </Box>
      </Box>
    </>
  );
};
