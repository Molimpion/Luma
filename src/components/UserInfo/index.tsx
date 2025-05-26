import React from "react";
import { styled } from "@mui/material/styles";
import { useUser } from "../../hooks/useUser";
import defaultAvatar from "../../assets/avatarRandom.png";
import {
  LoginOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@mui/icons-material";

const UserCardContainer = styled("div")<{ cardWidth: string }>`
  background: #5d3998;
  background: linear-gradient(
    176deg,
    rgba(93, 57, 152, 1) 0%,
    rgba(142, 108, 172, 1) 100%
  );
  height: 10.2rem;
  padding: 32px 0;
  width: ${(props) => props.cardWidth};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
`;

const AvatarImage = styled("img")`
  width: 6.1rem;
  height: 5.8rem;
  border-radius: 50%;
  margin-left: 1rem;
`;

const UserInfoName = styled("div")`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 0.1rem;
  margin-right: auto;
`;

const UserInfoDescription = styled("p")({
  color: "#C0C4CC",
  marginBottom: "1rem",
  fontSize: "0.875rem",
});

const InfoItemRoot = styled("div")`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  align-items: center;
  gap: 1.5rem;
  margin: 0;
`;

const InfoText = styled("span")({
  color: "#C0C4CC",
});
const NameInfoText = styled("span")({
  color: "#FFF",
});

const InfoNumber = styled("span")`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  margin-top: 1rem;
  /* margin-right: 5.375rem;
  margin-left: 5.375rem; */
  color: #fff;
  font-weight: bold;
`;

interface UserInfoProps {
  cardWidth: string;
  entradasStyle?: React.CSSProperties;
  saidaStyle?: React.CSSProperties;
  faltasStyle?: React.CSSProperties;
}

export function UserCardInfo({
  cardWidth,
  entradasStyle,
  saidaStyle,
  faltasStyle,
}: UserInfoProps) {
  const { userData, loadingUser, errorUser } = useUser();

  if (loadingUser) {
    return (
      <UserCardContainer cardWidth={cardWidth}>
        Carregando informações do usuário...
      </UserCardContainer>
    );
  }

  if (errorUser) {
    return (
      <UserCardContainer cardWidth={cardWidth}>
        Erro ao carregar usuário: {errorUser}
      </UserCardContainer>
    );
  }
  if (!userData) {
    return (
      <UserCardContainer cardWidth={cardWidth}>
        Nenhum usuário logado ou dados não encontrados.
      </UserCardContainer>
    );
  }

  return (
    <UserCardContainer cardWidth={cardWidth}>
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexGrow: 1,
          }}
        >
          <AvatarImage
            src={userData.avatar || defaultAvatar}
            alt={userData.name || userData.username || "Avatar do Usuário"}
          />
          <UserInfoName>
            <NameInfoText>{userData.name || userData.username}</NameInfoText>
            <UserInfoDescription>{userData.descricao}</UserInfoDescription>
          </UserInfoName>
        </div>
        <div
          style={{
            display: "flex",
            gap: "4.5rem",
            marginLeft: "auto",
            marginRight: "5rem",
          }}
        >
          <InfoItemRoot style={entradasStyle}>
            <InfoNumber>
              <LoginOutlined sx={{ fontSize: "2rem", color: "#FFF" }} />
              <span>{userData.entradas}</span>
            </InfoNumber>
            <InfoText>Entradas</InfoText>
          </InfoItemRoot>
          <InfoItemRoot style={saidaStyle}>
            <InfoNumber>
              <LogoutOutlined sx={{ fontSize: "2rem", color: "#FFF" }} />
              <span>{userData.saida}</span>
            </InfoNumber>
            <InfoText>Saída</InfoText>
          </InfoItemRoot>
          <InfoItemRoot style={faltasStyle}>
            <InfoNumber>
              <CloseOutlined sx={{ fontSize: "2rem", color: "#FFF" }} />
              <span>{userData.faltas}</span>
            </InfoNumber>
            <InfoText>Faltas</InfoText>
          </InfoItemRoot>
        </div>
      </div>
    </UserCardContainer>
  );
}
