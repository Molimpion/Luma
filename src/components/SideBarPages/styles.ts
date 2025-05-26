import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

interface DrawerProps {
  open?: boolean;
}

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  background: "#5D3998",
  backgroundImage:
    "linear-gradient(90deg, rgba(93, 57, 152, 1) 0%, rgba(142, 108, 172, 1) 50%)",
  color: "#fff",
  ...(open && {
    ...theme.mixins.drawerOpen,
    "& .MuiDrawer-paper": {
      ...theme.mixins.drawerOpen,
      background: "#5D3998",
      backgroundImage:
        "linear-gradient(90deg, rgba(93, 57, 152, 1) 0%, rgba(142, 108, 172, 1) 50%)",
      color: "#fff",
    },
  }),
  ...(!open && {
    ...theme.mixins.drawerClose,
    "& .MuiDrawer-paper": {
      ...theme.mixins.drawerClose,
      background: "#5D3998",
      backgroundImage:
        "linear-gradient(90deg, rgba(93, 57, 152, 1) 0%, rgba(142, 108, 172, 1) 50%)",
      color: "#fff",
    },
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

export const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  color: "#F2F3F5",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    "& .MuiListItemIcon-root": {
      color: "#fff",
    },
    "& .MuiListItemText-primary": {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  "& .MuiListItemIcon-root": {
    color: "#fff",
  },
}));

export const ListItemTextStyle = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
