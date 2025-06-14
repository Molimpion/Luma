import React from "react";
import { styled } from "@mui/material/styles";
import { useUser } from "../../hooks/useUser";
import defaultAvatar from "../../assets/avatarRandom.png";
import {
  LoginOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const UserCardContainer = styled("div")<{
  cardWidth?: string;
  cardHeight?: string;
}>(({ theme, cardWidth, cardHeight }) => ({
  background:
    "linear-gradient(176deg, rgba(93,57,152,1) 0%, rgba(142,108,172,1) 100%)",
  padding: theme.spacing(2),
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius * 2,

  width: "100%",
  maxWidth: cardWidth || "100%",

  minHeight: cardHeight || "30rem",
  justifyContent: "space-between",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(1.5),
    justifyContent: "flex-start",
    minHeight: "auto",
  },
}));

const AvatarImage = styled("img")(({ theme }) => ({
  borderRadius: "50%",

  width: theme.spacing(6),
  height: theme.spacing(6),
  [theme.breakpoints.up("sm")]: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  [theme.breakpoints.up("md")]: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  marginLeft: theme.spacing(2),
}));

const UserInfoName = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const UserInfoDescription = styled(Typography)(({ theme }) => ({
  color: "#C0C4CC",
  fontSize: "0.875rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
  },
}));

const InfoGroup = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: theme.spacing(4),
  marginLeft: "auto",
  marginRight: theme.spacing(3),
  flexWrap: "nowrap",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

const InfoItemRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  fontSize: "0.875rem",
  alignItems: "center",
  gap: theme.spacing(1),
  maragin: 0,

  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing(1),
  },
}));

const InfoText = styled(Typography)({
  color: "#C0C4CC",
  fontSize: "0.75rem",
});

const NameInfoText = styled(Typography)({
  color: "#FFF",
  fontWeight: 500,
});

const InfoNumber = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  fontSize: "1rem",
  color: "#fff",
  fontWeight: "bold",

  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
}));

interface UserInfoProps {
  cardWidth?: string;
  cardHeight?: string;
  entradasStyle?: React.CSSProperties;
  saidaStyle?: React.CSSProperties;
  faltasStyle?: React.CSSProperties;
  faltas?: number;
}

export function UserCardInfo({
  cardWidth,
  cardHeight,
  entradasStyle,
  saidaStyle,
  faltasStyle,
  faltas,
}: UserInfoProps) {
  const { userData, loadingUser, errorUser } = useUser();

  if (loadingUser) {
    return (
      <UserCardContainer cardWidth={cardWidth} cardHeight={cardHeight}>
        Carregando informações do usuário...
      </UserCardContainer>
    );
  }

  if (errorUser) {
    return (
      <UserCardContainer cardWidth={cardWidth} cardHeight={cardHeight}>
        Erro ao carregar usuário: {errorUser}
      </UserCardContainer>
    );
  }
  if (!userData) {
    return (
      <UserCardContainer cardWidth={cardWidth} cardHeight={cardHeight}>
        Nenhum usuário logado ou dados não encontrados.
      </UserCardContainer>
    );
  }

  return (
    <UserCardContainer cardWidth="{cardWidth}" cardHeight="10.2rem">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: { xs: "flex-start", sm: "space-between" },
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            mb: { xs: 1, sm: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <AvatarImage
            src={userData.avatar || defaultAvatar}
            alt={userData.name || userData.username || "Avatar do Usuário"}
          />
          <UserInfoName>
            <NameInfoText variant="subtitle1">
              {userData.name || userData.username}
            </NameInfoText>
            <UserInfoDescription variant="body2">
              {userData.descricao}
            </UserInfoDescription>
          </UserInfoName>
        </Box>

        <InfoGroup>
          <InfoItemRoot style={entradasStyle}>
            <InfoNumber>
              <LoginOutlined
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, color: "#FFF" }}
              />
              <span>{userData.entradas}</span>
            </InfoNumber>
            <InfoText variant="caption">Entradas</InfoText>
          </InfoItemRoot>
          <InfoItemRoot style={saidaStyle}>
            <InfoNumber>
              <LogoutOutlined
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, color: "#FFF" }}
              />
              <span>{userData.saida}</span>
            </InfoNumber>
            <InfoText variant="caption">Saída</InfoText>
          </InfoItemRoot>
          <InfoItemRoot style={faltasStyle}>
            <InfoNumber>
              <CloseOutlined
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, color: "#FFF" }}
              />
              <span>{faltas !== undefined ? faltas : userData.faltas}</span>
            </InfoNumber>
            <InfoText variant="caption">Faltas</InfoText>
          </InfoItemRoot>
        </InfoGroup>
      </Box>
    </UserCardContainer>
  );
}
