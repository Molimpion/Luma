import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListItem,
  Box,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { ArrowBackIosOutlined as ArrowBack } from "@mui/icons-material";

export const LogoutButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleConfirmLogout = () => {
    logout();
    handleCloseModal();
    navigate("/");
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleOpenModal}
          sx={{
            position: "relative",
            borderRadius: "20px",
            paddingLeft: "8px",
            paddingRight: "0px",

            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: "36px", ml: 1 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Sair"
            sx={{ "& .MuiTypography-Root": { color: "white" } }}
          />
        </ListItemButton>
      </ListItem>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            width: "700px",
            height: "420px",
            maxWidth: "90vw",
            padding: 3,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            color: "#5d3998",
            top: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            padding: 1,
          }}
        >
          <ErrorOutlineOutlinedIcon sx={{ fontSize: 200 }} />
        </Box>

        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10rem",
            fontWeight: "bold",
            fontSize: "1.8rem",
          }}
        >
          Você está se desconectando do Luma!
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px",
            }}
          >
            Você tem certeza?
          </Typography>
        </DialogContent>
        <Box
          sx={{
            top: 8,
            right: 8,
            position: "absolute",
          }}
        >
          <Button
            onClick={handleCloseModal}
            color="primary"
            sx={{
              color: "#5d3998",
              "&:hover": {
                backgroundColor: "#ffffff",
              },
            }}
          >
            <ArrowBack />
          </Button>
          <Typography>Retornar</Typography>
        </Box>
        <DialogActions
          sx={{
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Button
            onClick={handleConfirmLogout}
            variant="contained"
            sx={{
              width: "10rem",
              borderRadius: "20px",
              backgroundColor: "#5d3998",
              "&:hover": {
                backgroundColor: "#7c4cc9",
              },
            }}
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
