import { CalendarSection } from "./CalendarSection";
import { FrequentItems } from "./FrequentItems";
import { Box } from "@mui/material";

export { FrequentItems } from "./FrequentItems";
export { CalendarSection } from "./CalendarSection";
export { MonthlyFrequencyChart } from "./MonthlyFrequencyChart";

export const SideBarPages = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        width: "100%",
        padding: 2,
      }}
    >
      <Box sx={{ border: "1px solid red", flex: 1 }}>
        <FrequentItems />
      </Box>
      <Box sx={{ flex: 1 }}>
        <CalendarSection />
      </Box>
    </Box>
  );
};
