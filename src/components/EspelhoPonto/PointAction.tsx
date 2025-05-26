import { Button, Box, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const PointActions = () => {
  const iconSize = "3rem";

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column" }, gap: 1 }}>
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          borderColor: "rgba(105, 69, 164)",
          color: "black",
        }}
      >
        <DownloadIcon
          sx={{
            fontSize: iconSize,
            marginRight: 1,
            color: "rgba(105, 69, 164)",
          }}
        />
        <Typography variant="body2">Baixar espelho de ponto</Typography>
      </Button>

      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          borderColor: "rgba(105, 69, 164)",
          color: "black",
        }}
      >
        <DescriptionIcon
          sx={{
            fontSize: iconSize,
            marginRight: 1,
            color: "rgba(105, 69, 164)",
          }}
        />
        <Typography variant="body2">Acessar resumo do período</Typography>
      </Button>

      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          borderColor: "rgba(105, 69, 164)",
          color: "black",
        }}
      >
        <AccessTimeIcon
          sx={{
            fontSize: iconSize,
            marginRight: 1,
            color: "rgba(105, 69, 164)",
          }}
        />
        <Typography variant="body2">Banco de horas</Typography>
      </Button>
    </Box>
  );
};
