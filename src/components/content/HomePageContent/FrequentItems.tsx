import { Box, Button, Typography } from "@mui/material";

export const FrequentItems = () => {
  const items = [
    { label: "Batida de Ponto", color: "#fafafa" },
    { label: "Envelope de Pagamento", color: "#fafafa" },
    { label: "Solicitar Abono", color: "#fafafa" },
  ];

  return (
    <Box sx={{ mb: 4, mt: 4 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Mais Acessados
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        {items.map((item) => (
          <Button
            key={item.label}
            variant="contained"
            sx={{
              backgroundColor: item.color,
              color: "black",
              px: 3,
              py: 1.5,
              width: "130px",
              height: "127px",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "medium",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: `${item.color}`,
                opacity: 0.9,
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              },
              minWidth: "180px",
            }}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
