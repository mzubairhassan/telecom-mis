import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles({
  root: {
    "& .MuiPaper-root": {
      background: "white",
    },
  },
});

function CustomModal(props) {
  const { open, title, onClose } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={classes.root}
      TransitionComponent={Transition}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#12191b",
          color: "white",
        }}
      >
        {title}{" "}
        <IconButton onClick={onClose} color="warning">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
}

export default CustomModal;
