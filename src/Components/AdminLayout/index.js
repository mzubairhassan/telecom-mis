import { Grid } from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";
import Drawer from "@mui/material/Drawer";
import { makeStyles, useTheme } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

function AdminLayout({ children }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Grid container spacing={0}>
      <Grid item sm={2} md={2}>
        <Drawer
          variant="persistent"
          fullWidth
          open={true}
          className={classes.root}
          sx={{
            width: 250,
            "& .MuiDrawer-paper": {
              width: 250,
              background: "#253237",
              color: "#E0FBFC",
            },
          }}
        >
          <Sidebar />
        </Drawer>
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        md={9}
        sx={{
          marginTop: 5,
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}

export default AdminLayout;
