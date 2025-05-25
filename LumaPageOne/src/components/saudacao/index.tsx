import React from "react";
import { Typography } from "@mui/material";

interface GreetingProps {
  name: string;
}

export const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        color:
          "linear-gradient(176deg,rgba(0, 0, 0, 1) 65%, rgba(142, 108, 172, 1) 100%);",
        marginBottom: 2,
        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        textAlign: "left",
        width: "100%",
        mt: -3,
        mb: -1,
      }}
    >
      Olá, {name}
    </Typography>
  );
};
