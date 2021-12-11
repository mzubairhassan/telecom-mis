import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PersonIcon from "@mui/icons-material/Person";
import LeakAddIcon from "@mui/icons-material/LeakAdd";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const useStyles = makeStyles({
  root: {
    padding: "5px",
  },
  header: {
    textAlign: "center",
  },
  list: {
    marginTop: "2rem",
  },
});
const urls = [
  {
    name: "Dashboard",
    url: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Items",
    url: "/admin/itemconfig",
    icon: <InventoryIcon />,
  },
  {
    name: "Vendors",
    url: "/admin/vendorconfig",
    icon: <StoreIcon />,
  },
  {
    name: "Accounts",
    url: "/admin/accountconfig",
    icon: <AccountBalanceIcon />,
  },
  {
    name: "Plans",
    url: "/admin/planconfig",
    icon: <CardMembershipIcon />,
  },
  {
    name: "Users",
    url: "/admin/userconfig",
    icon: <PersonIcon />,
  },
  {
    name: "Subscriptions",
    url: "/admin/subscipconfig",
    icon: <LeakAddIcon />,
  },
];

function Sidebar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>7Star</div>
      <List>
        {urls.map((e) => {
          return (
            <>
              <ListItem component={Link} to={e.url} button key={e.name}>
                <ListItemIcon sx={{ color: "white" }}>{e.icon}</ListItemIcon>
                <ListItemText>{e.name}</ListItemText>
              </ListItem>
              <Divider sx={{ background: "white" }} />
            </>
          );
        })}
      </List>
    </div>
  );
}

export default Sidebar;
