import { Box, Divider } from "@mui/material";
import { PersistentDrawerLeft } from "../SideBarPages";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export function DefaultLayout() {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        mt: 8,
      }}
    >
      <PersistentDrawerLeft open={open} setOpen={setOpen} />
      <Box
        sx={{
          flexGrow: 1,
          padding: (theme) => theme.spacing(3),
          ml: -4,
          mb: -4,
          mt: -5,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: "20px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Divider
          sx={{
            mt: 2,
          }}
        />
        <Outlet />
      </Box>
    </Box>
  );
}
