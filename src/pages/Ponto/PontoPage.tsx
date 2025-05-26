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
    <Box sx={{ display: "flex", width: "100%" }}>
      <Main
        sx={{
          width: "100%",
        }}
      >
        <Box sx={{ marginLeft: 5, mt: -9.2 }}>
          <Greeting name={userData?.name || "usuário"} />{" "}
        </Box>

        <Box sx={{ marginLeft: "1rem", mt: 1, pr: -1, pl: 0 }}>
          {userData && <UserCardInfo {...userData} cardWidth="100%" />}{" "}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 3,
            mb: 2,
            ml: 2,
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
            Ponto
          </Typography>
        </Box>

        <Box sx={{ display: "inline-block" }}>
          {pontoHomeItems.map((item) => (
            <Link
              key={item.title}
              to={`/app/ponto/${item.path}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                width: "100%",
              }}
            >
              <PontoHome icon={item.icon} title={item.title} />
            </Link>
          ))}
        </Box>

        <Box sx={{ mt: 4, width: "100%" }}>
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
};
