import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

const Editicon = ({ row, detail, setDetail }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState(row.name);
  const [email, setEmail] = useState(row.email);
  const [role, setRole] = useState(row.role);

  const handleClickOpen = async (row) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (name, email, role, id, detail, setDetail, row) => {
    let newObj = {
      id: id,
      name: name,
      email: email,
      role: role,
    };
    let val = [...detail];
    val[id - 1] = newObj;
    setDetail(val);

    setOpen(false);
  };
  return (
    <>
      <ModeEditOutlinedIcon onClick={() => handleClickOpen(row)} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Values</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
            variant="standard"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Role"
            type="email"
            fullWidth
            variant="standard"
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() =>
              handleSubmit(name, email, role, row.id, detail, setDetail, row)
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Editicon;
