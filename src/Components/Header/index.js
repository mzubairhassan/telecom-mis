import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { textAlign } from "@mui/system";
import React from "react";
const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 2fr",
    color: "#5C6B73",
    textAlign: "center",
  },
  introLine: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& hr": {
      width: "20rem",
      height: "2px",
      background: "#9DB4C0",
      border: 0,
      margin: 0,
      display: "inline-block",
    },
  },
});

function Header({ name }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div
        className={classes.introLine}
        style={{
          justifyContent: "flex-end",
        }}
      >
        <hr />
      </div>
      <div>
        <Typography variant="h3">{name}</Typography>
      </div>
      <div
        className={classes.introLine}
        style={{
          justifyContent: "flex-start",
        }}
      >
        <hr />
      </div>
    </div>
  );
}

export default Header;
