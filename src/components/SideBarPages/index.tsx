import * as React from "react";
import { styled } from "@mui/material/styles";
import type { CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logoLuma.png";
import { SvgIconComponent } from "@mui/icons-material";
import { useUser } from "../../hooks/useUser";
import { LogoutButton } from "../logout/index";

const drawerWidth = 230;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(["position", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: "100%",
  zIndex: theme.zIndex.drawer + 1,
  position: "fixed",
  top: 0,
  backgroundColor: "transparent",
  boxShadow: "none",
}));

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(
  ({ theme, open }): CSSObject => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create(["margin-left", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: "0",
    width: "100%",
    position: "relative",
    display: "block",
    marginTop: "64px",
    minHeight: "calc(100vh - 64px)",
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth - 1}px`,
      width: `calc(100% - ${drawerWidth}px)`,
    }),
  })
);

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "center",
  marginBottom: theme.spacing(1),
}));

interface SidebarItem {
  text: string;
  icon: SvgIconComponent;
  path: string;
  color?: string;
}

export function PersistentDrawerLeft() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useUser();

  const sideBarItems: SidebarItem[] = React.useMemo(
    () => [
      {
        text: "Início",
        icon: HomeOutlinedIcon,
        path: "/app/inicio",
        color: "white",
      },
      { text: "Pagamento", icon: WalletOutlinedIcon, path: "/app/pagamento" },
      { text: "Ponto", icon: AccessTimeOutlinedIcon, path: "/app/ponto" },
      { text: "Férias", icon: WbSunnyOutlinedIcon, path: "/app/ferias" },
      {
        text: "Fale com o RH",
        icon: ChatBubbleOutlineOutlinedIcon,
        path: "/app/rh",
      },
    ],
    []
  );

  const handleItemClick = (item: SidebarItem) => {
    if (item.text === "Sair") {
      logout();
      localStorage.removeItem("loggedInUserId");
      navigate("/");
    } else {
      navigate(item.path);
    }
  };

  const selectedIndex = React.useMemo(() => {
    const idx = sideBarItems.findIndex((it) => {
      if (location.pathname === it.path) return true;
      if (it.path === "/app/ponto")
        return location.pathname.startsWith(it.path + "/");
      return false;
    });
    return idx > -1 ? idx : 0;
  }, [location.pathname, sideBarItems]);

  return (
    <Root>
      <CssBaseline />

      <Box
        sx={{
          position: "fixed",
          top: (theme) => theme.spacing(2),
          left: (theme) => theme.spacing(2),
          zIndex: (theme) => theme.zIndex.drawer + 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "4px 8px",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <img src={Logo} alt="Logo da Luma" height="30" />
      </Box>

      <AppBar>
        <Toolbar />
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#5D3998",
            color: "#fff",
            borderRight: "none",
            boxShadow: "none",
            position: "fixed",
            height: "100vh",
            top: 0,
            left: 0,
            overflowX: "hidden",
            overflowY: "auto",
            transition: (theme) =>
              theme.transitions.create("transform", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        <DrawerHeader sx={{ backgroundColor: "white", height: "64px" }} />
        <Divider />
        <List
          sx={{
            padding: "8px",
            "& .MuiListItem-root": {
              paddingTop: "4px",
              paddingBottom: "4px",
              paddingLeft: "8px",
              paddingRight: "0px",
            },
          }}
        >
          {sideBarItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(item)}
                sx={{
                  position: "relative",
                  backgroundColor:
                    selectedIndex === index ? "white" : "transparent",
                  borderRadius: "20px",
                  overflow: "visible",
                  "&:hover": {
                    backgroundColor:
                      selectedIndex === index
                        ? "white"
                        : "rgba(255, 255, 255, 0.1)",
                  },
                  ...(selectedIndex === index && {
                    "&::after": {
                      content: "''",
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: "-100vw",
                      backgroundColor: "white",
                      borderRadius: "20px 20px 20px 20px",
                      zIndex: -1,
                    },
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      selectedIndex === index
                        ? "#5D3998"
                        : item.color || "white",
                    minWidth: "36px",
                  }}
                >
                  {<item.icon />}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiTypography-root": {
                      color: selectedIndex === index ? "#5D3998" : "white",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <LogoutButton />
        </List>
        <Divider />
      </Drawer>

      <Main></Main>
    </Root>
  );
}
