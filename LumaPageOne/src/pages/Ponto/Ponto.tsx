import React from "react";
import { Card, Typography, IconButton, Box } from "@mui/material";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

export const PontoHome = ({ icon, title, onClick }: ActionCardProps) => (
  <Box sx={{ px: 1, py: 1, width: "23rem" }}>
    <Card
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        p: 2,
        mb: 0,
        height: "6rem",
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <IconButton
        sx={{
          color: "#5D3998",
          mr: 2,
          p: 1.5,
          borderRadius: 2,
        }}
        disableRipple
      >
        {icon}
      </IconButton>

      <Typography
        sx={{
          p: -1,
          m: -2,
        }}
      >
        {title}
      </Typography>
    </Card>
  </Box>
);
