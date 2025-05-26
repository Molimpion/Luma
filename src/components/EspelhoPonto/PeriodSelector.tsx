import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

interface PeriodSelectorProps {
  currentMonth: string;
  onPrevious: () => void;
  onNext: () => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  currentMonth,
  onPrevious,
  onNext,
}) => {
  const borderColor = "rgba(105, 69, 164)";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        border: `1px solid ${borderColor}`,
        borderRadius: 1,
        padding: "4px",
        backgroundColor: "rgba(105, 69, 164, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "auto",
        }}
      >
        <IconButton
          onClick={onPrevious}
          aria-label="mês anterior"
          sx={{ mr: 2 }}
        >
          <ArrowLeftIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "rgba(105, 69, 164)",
            mx: 2,
            fontWeight: "bold",
          }}
        >
          {currentMonth}
        </Typography>
        <IconButton onClick={onNext} aria-label="próximo mês" sx={{ ml: 2 }}>
          <ArrowRightIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
