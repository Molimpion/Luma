import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";

export const CalendarSection = () => (
  <Box
    sx={{
      width: "100%",
      maxWidth: 380,
      border: "1px solid #f0f0f0",
      borderRadius: 2,
      p: 2,
      backgroundColor: "white",
      boxShadow: 1,
      display: "flex",
      position: { md: "sticky" },
    }}
  >
    {/* <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
      Calendário
    </Typography> */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{
          width: "100%",
          "& .MuiPickersCalendarHeader-root": {
            justifyContent: "space-between",
            paddingLeft: 2,
            paddingRight: 2,
          },
          "& .MuiPickersDay-root": {
            width: 36,
            height: 36,
          },
        }}
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
      />
    </LocalizationProvider>
  </Box>
);
