import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { ContentCutOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Editicon from "./editicon";
import "./Table1.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
let checkedrow = [];

export default function Table1({ detail, setDetail }) {
  const [maincheck, setMaincheck] = useState(false);

  //const [mainsubcheck, setMainsubcheck] = useState(false);

  const head = ["Name", "Email", "Role", "Actions"];
  const rows1 = detail.map((row) => {
    return row;
  });

  const DeleteOnClick = (id, detail, setDetail) => {
    let newList = detail.filter((l) => {
      return l.id != id;
    });
    setDetail(JSON.parse(JSON.stringify(newList)));
    console.log(id, "Deleted");
  };
  const CheckOnClick = (id) => {
    if (checkedrow.includes(id)) {
      checkedrow.splice(checkedrow.indexOf(id), 1);
    } else {
      checkedrow.push(id);
    }
    console.log(checkedrow);
  };

  const AllDeleteOnClick = () => {
    console.log(checkedrow);
    if (checkedrow.length) {
      let newList = [...detail];
      for (let i = 0; i < checkedrow.length; i++) {
        newList = newList.filter((l) => {
          return checkedrow[i] !== l.id;
        });
      }
      setDetail(JSON.parse(JSON.stringify(newList)));
    }
    checkedrow = [];
  };

  return (
    <>
      <TableContainer component={Paper} className="table-container">
        <Table
          sx={{ maxWidth: 650 }}
          aria-label="simple table"
          className="table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  style={{ align: "left" }}
                  onClick={() => {
                    setMaincheck(!maincheck);
                  }}
                />
              </TableCell>
              {head.map((h) => {
                return (
                  <TableCell align="left">
                    <strong>{h}</strong>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {detail.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Checkbox
                    value={row.name}
                    onClick={() => CheckOnClick(row.id)}
                  />
                </TableCell>

                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.role}</TableCell>

                <TableCell align="left">
                  <DeleteIcon
                    style={{ margin: 5 }}
                    onClick={() => DeleteOnClick(row.id, detail, setDetail)}
                  />
                  <>
                    <Editicon row={row} detail={detail} setDetail={setDetail} />
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="outlined"
        color="error"
        onClick={() => AllDeleteOnClick(detail, setDetail)}
        className="DeleteButton"
      >
        DELETE
      </Button>
    </>
  );
}
