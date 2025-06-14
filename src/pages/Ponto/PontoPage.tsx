import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import {
  AccessTimeOutlined,
  EditNoteOutlined,
  PunchClock,
} from "@mui/icons-material";
import { Main } from "../../components/SideBarPages";
import { UserCardInfo } from "../../components/UserInfo";
import { Greeting } from "../../components/saudacao";
import { PontoHome } from "./Ponto";
import { Link, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

export const PontoPage: React.FC = () => {
  const { userData } = useUser();

  const pontoHomeItems = [
    {
      icon: <AccessTimeOutlined sx={{ fontSize: "3rem" }} />,
      title: "Registrar Ponto",
      path: "registrar",
    },
    {
      icon: <EditNoteOutlined sx={{ fontSize: "3rem" }} />,
      title: "Solicitar Abono",
      path: "solicitarabono",
    },
    {
      icon: <PunchClock sx={{ fontSize: "3rem" }} />,
      title: "Espelho de Ponto",
      path: "espelhoponto",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
      }}
    >
      <Main
        sx={{
          width: "100%",
          px: { xs: 1, sm: 2, md: 3 },
          py: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ ml: { xs: 0, md: 5 }, mt: { xs: 2, md: 0 } }}>
          <Greeting name={userData?.name || "usuário"} />
        </Box>

        <Box sx={{ ml: { xs: 0, md: 2 }, mt: { xs: 2, md: 1 }, width: "100%" }}>
          {userData && <UserCardInfo {...userData} cardWidth="100%" />}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: { xs: 2, md: 3 },
            mb: { xs: 2, md: 2 },
            ml: { xs: 0, md: 2 },
          }}
        >
          <Divider
            orientation="vertical"
            sx={{
              height: 20,
              width: 3,
              bgcolor: "#5D3998",
              mr: 0.5,
              display: { xs: "none", sm: "block" },
            }}
          />
          <Typography variant="subtitle1" color="textSecondary">
            Ponto
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column" },
            flexWrap: "wrap",
            gap: 2,
            ml: { xs: 0, md: 2 },
            mt: { xs: 2, md: 0 },
          }}
        >
          {pontoHomeItems.map((item) => (
            <Link
              key={item.title}
              to={`/app/ponto/${item.path}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                width: { xs: "100%", sm: "auto" } as any,
              }}
            >
              <PontoHome icon={item.icon} title={item.title} />
            </Link>
          ))}
        </Box>

        <Box sx={{ mt: { xs: 4, md: 4 }, width: "100%" }}>
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
};
