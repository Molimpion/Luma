import {
  BarChart,
  ChartsXAxis as XAxis,
  ChartsYAxis as YAxis,
  ChartsTooltip as Tooltip,
  ChartsGrid as CartesianGrid,
} from "@mui/x-charts";
import { Box } from "@mui/material"; // Importe o Box do MUI

export const MonthlyFrequencyChart = () => {
  const data = [80, 40, 30, 20, 10, 0];
  const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月"];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end", // Alinha o gráfico à direita
        padding: 2, // Adiciona um espaçamento ao redor
      }}
    >
      <BarChart
        width={500}
        height={300}
        series={[
          {
            data,
            label: "Frequência",
            type: "bar",
            color: "#5D3998",
          },
        ]}
        xAxis={[
          {
            data: months,
            scaleType: "band",
            id: "months",
          },
        ]}
      >
        <CartesianGrid />
        <XAxis axisId="months" />
        <YAxis />
        <Tooltip />
      </BarChart>
    </Box>
  );
};
