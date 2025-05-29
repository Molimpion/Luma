import React from "react";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";

interface PointRecord {
  date: string;
  entrada: string;
  saida: string;
}

interface PointRecordTableProps {
  records: PointRecord[];
}

export const PointRecordTable: React.FC<PointRecordTableProps> = ({
  records,
}) => {
  const rowBorderColor = "rgba(105, 69, 164, 0.3)";

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 1000,
        border: 1,
        borderColor: "rgba(105, 69, 164)",
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "rgba(105, 69, 164, 0.1)" }}>
          <TableRow>
            <TableCell
              align="left"
              sx={{
                fontWeight: "bold",
                pl: 6,
                borderBottom: `1px solid ${"rgba(105, 69, 164)"}`,
              }}
            >
              Data
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontWeight: "bold",
                borderBottom: `1px solid ${"rgba(105, 69, 164)"}`,
              }}
            >
              Entrada
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontWeight: "bold",
                pr: 6,
                borderBottom: `1px solid ${"rgba(105, 69, 164)"}`,
              }}
            >
              Saída
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record, index) => (
            <TableRow
              key={record.date || index}
              sx={{
                "&:nth-child(even)": {
                  backgroundColor: "rgba(105, 69, 164, 0.1)",
                },
                "&:last-child td, &:last-child th": { border: 0 },
                borderBottom: `1px solid ${rowBorderColor}`,
                "& td": {
                  borderBottom: `1px solid`,
                  borderColor: "rgba(105, 69, 164)",
                },
                "& th": {
                  borderBottom: `1px solid`,
                  borderColor: "rgba(105, 69, 164)",
                },
              }}
            >
              <TableCell component="th" scope="row">
                {record.date}
              </TableCell>
              <TableCell align="center">{record.entrada}</TableCell>

              <TableCell align="right">{record.saida}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
