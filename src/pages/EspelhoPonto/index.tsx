import { useState, useEffect } from "react";
import { Box, Typography, Divider, IconButton, Button } from "@mui/material";
import { Main } from "../../components/SideBarPages";
import { UserCardInfo } from "../../components/UserInfo";
import { PointRecordTable } from "../../components/EspelhoPonto/PointRecordTable";
import { PeriodSelector } from "../../components/EspelhoPonto/PeriodSelector";
import { PointActions } from "../../components/EspelhoPonto/PointAction";
import { useUser } from "../../hooks/useUser";
import { Greeting } from "../../components/saudacao";
import { useNavigate } from "react-router-dom";
import { ArrowBackIosOutlined as ArrowBack } from "@mui/icons-material";
import {
  RawPontoData,
  PontoRecord,
} from "../../contexts/UserContextDefinition";

const getMonthRange = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  return { first: firstDayOfMonth, last: lastDayOfMonth };
};

const toIso = (d: Date) => d.toISOString().slice(0, 10);

export const EspelhoPontoPage = () => {
  const navigate = useNavigate();
  const { userData, loadingUser, errorUser } = useUser();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [records, setRecords] = useState<PontoRecord[]>([]);

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!userData?.id) {
      return;
    }

    const { first: firstDateObj, last: lastDateObj } =
      getMonthRange(currentMonth);
    const startDate = toIso(firstDateObj);
    const endDate = toIso(lastDateObj);

    fetch(`/api/pontos?userId=${userData.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((pontos: RawPontoData[]) => {
        const filteredPontos = pontos.filter((ponto) => {
          const pontoDate = ponto.date;
          return pontoDate >= startDate && pontoDate <= endDate;
        });

        const mapdosDias: Record<string, PontoRecord> = {};

        filteredPontos.sort((a, b) => a.timestamp - b.timestamp);

        filteredPontos.forEach(({ date, dataHora, type }) => {
          const hora = dataHora.split("|")[1].replace(/\s/g, "").trim();
          const [, m, d] = date.split("-");
          const label = `${d}/${m}`;

          if (!mapdosDias[label]) {
            mapdosDias[label] = { date: label, entrada: "", saida: "" };
          }

          if (type === "entrada" && !mapdosDias[label].entrada) {
            mapdosDias[label].entrada = hora;
          } else if (type === "saida") {
            mapdosDias[label].saida = hora;
          }
        });

        const daysCount = lastDateObj.getDate();
        const arr: PontoRecord[] = [];

        for (let day = 1; day <= daysCount; day++) {
          const dd = String(day).padStart(2, "0");
          const mm = String(currentMonth.getMonth() + 1).padStart(2, "0");
          const key = `${dd}/${mm}`;

          const record = mapdosDias[key] || {
            date: key,
            entrada: "",
            saida: "",
          };
          arr.push(record);
        }
        setRecords(arr);
      })
      .catch((err) => console.error(err));
  }, [currentMonth, userData?.id]);

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
        <Typography color="error">
          Erro ao carregar usuário: {errorUser}
        </Typography>
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
        <UserCardInfo cardWidth="100%" faltas={userData.faltas} />
      </Box>
      <Main>
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
            marginTop: 4,
            mr: 1,
            ml: 1,
          }}
        >
          <IconButton onClick={handleVoltar} sx={{ top: 1, left: 8 }}>
            <ArrowBack />
            <Typography fontWeight="bold" sx={{ color: "black" }}>
              Espelho de Ponto
            </Typography>
          </IconButton>
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 3,
              }}
            >
              <PeriodSelector
                currentMonth={currentMonth}
                onPrevious={handlePreviousMonth}
                onNext={handleNextMonth}
              />
            </Box>

            <Box sx={{ mt: 4 }}>
              <Divider />
            </Box>

            <Box
              sx={{
                backgroundColor: "white",
                display: "flex",
                gap: 5,
                alignItems: "flex-start",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
                <PointRecordTable records={records} />
              </Box>

              <PointActions />
            </Box>
          </Box>
        </Box>
      </Main>
    </>
  );
};
