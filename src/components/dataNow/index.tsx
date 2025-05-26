// src/components/CurrentDate.tsx
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

export const CurrentDate: React.FC = () => {
  const [now, setNow] = useState(new Date());

  // atualiza a cada minuto para manter o minuto exibido correto
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  // formata algo como "Sexta-feira, 17 de Maio de 2025"
  const formattedDate = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Typography
      variant="body2"
      sx={{ textTransform: "capitalize", color: "rgba(0,0,0,0.6)" }}
    >
      {formattedDate}
    </Typography>
  );
};
