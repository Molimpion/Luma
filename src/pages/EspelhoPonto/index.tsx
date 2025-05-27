import { useState } from "react";
import { Box, Typography, Divider, Button, IconButton } from "@mui/material"; // Importe IconButton aqui
import { Main } from "../../components/SideBarPages";
import { UserCardInfo } from "../../components/UserInfo";
import { PointRecordTable } from "../../components/EspelhoPonto/PointRecordTable";
import { PeriodSelector } from "../../components/EspelhoPonto/PeriodSelector";
import { PointActions } from "../../components/EspelhoPonto/PointAction";
import { useUser } from "../../hooks/useUser";
import { Greeting } from "../../components/saudacao";
import { useNavigate } from "react-router-dom";
import { ArrowBackIosOutlined as ArrowBack } from "@mui/icons-material"; // Importe o ícone aqui

export const EspelhoPontoPage = () => {
  const navigate = useNavigate();
  const { userData, loadingUser, errorUser } = useUser();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const pointRecords = [
    { date: "15/05", entrada: "", saida: "" },
    { date: "16/05", entrada: "", saida: "" },
    { date: "17/05", entrada: "", saida: "" },
    { date: "18/05", entrada: "", saida: "" },
    { date: "19/05", entrada: "", saida: "" },
    { date: "20/05", entrada: "", saida: "" },
    { date: "21/05", entrada: "", saida: "" },
    { date: "22/05", entrada: "", saida: "" },
  ];

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });

    console.log("Mês anterior");
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });

    console.log("Próximo mês");
  };

  const handleVoltar = () => {
    navigate(-1); // Retorna para a página anterior
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
      <Main>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 3,
            mb: -3,
            paddingLeft: "1.8rem", // Ajuste o paddingLeft para corresponder
          }}
        >
          <Divider
            orientation="vertical"
            sx={{ height: "20px", width: "3px", bgcolor: "#5D3998", mr: 0.5 }}
          />
          <Typography variant="subtitle1" color="textSecondary">
            Espelho de Ponto
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            padding: 3,
            borderRadius: 3,
            marginTop: 3,
            mr: 1, // Adicionado margin-right para corresponder
            ml: 1, // Adicionado margin-left para corresponder
          }}
        >
          {/* Adicionado o IconButton para "Retornar" aqui */}
          <IconButton
            onClick={handleVoltar}
            sx={{ position: "absolute", top: 8, right: 8 }} // Posiciona o botão no canto superior direito
          >
            <ArrowBack />
            <Typography>Retornar</Typography>
          </IconButton>

          {/* Título da página dentro do container */}
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Espelho de Ponto
          </Typography>

          {/* Container principal */}
          <Box sx={{ p: 2 }}>
            {/* Caixa de Período (Centralizada) */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 3,
              }}
            >
              <PeriodSelector
                currentMonth={new Intl.DateTimeFormat("pt-BR", {
                  year: "numeric",
                  month: "long",
                })
                  .format(currentMonth)
                  .toUpperCase()}
                onPrevious={handlePreviousMonth}
                onNext={handleNextMonth}
              />
            </Box>

            {/* Separador visual */}
            <Box sx={{ mt: 4 }}>
              <Divider />
            </Box>

            {/* Container Principal (Layout em Linha) */}
            <Box
              sx={{
                backgroundColor: "white",
                display: "flex",
                gap: 5,
                alignItems: "flex-start",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              {/* Parte Esquerda: Lista de Datas, Entrada e Saída */}
              <Box sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
                {" "}
                {/* Largura total em xs */}
                <PointRecordTable records={pointRecords} />
              </Box>

              {/* Parte Direita: Botões de Ação */}
              <PointActions />
            </Box>
          </Box>
        </Box>
      </Main>
    </>
  );
};
