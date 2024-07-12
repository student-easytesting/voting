import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ReactTable({ resultData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">VoteCounts</StyledTableCell>
            <StyledTableCell align="right">FirstChoiceVotes</StyledTableCell>
            <StyledTableCell align="right">Eliminated</StyledTableCell>
            <StyledTableCell align="right">Team</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resultData[0].map((i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {`${resultData[1][i]}`}
              </StyledTableCell>
              <StyledTableCell align="right">
                {`${resultData[2][i]}`}
              </StyledTableCell>
              <StyledTableCell align="right">
                {`${resultData[3][i]}`}
              </StyledTableCell>
              <StyledTableCell align="right">
                {`${resultData[4][i]}`}
              </StyledTableCell>
              <StyledTableCell align="right">{`Team ${resultData[5][i]}`}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
