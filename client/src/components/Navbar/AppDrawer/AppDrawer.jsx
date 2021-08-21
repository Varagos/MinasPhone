import { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import {
  Home,
  Smartphone,
  Watch,
  TabletMac,
  Headset,
  Storefront,
  Lock,
  PersonAdd,
} from "@material-ui/icons";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const drawerItems = [
  ["ΑΧΙΚΉ", "/", <Home />],
  ["ΚΙΝΗΤΑ", "/category/smartphones", <Smartphone />],
  ["SMARTWATCH", "/category/smartwatches", <Watch />],
  ["TABLET", "/category/tablets", <TabletMac />],
  ["ACCESSORIES", "/category/accessories", <Headset />],
  ["ALL PRODUCTS", "/products", <Storefront />],
];

const drawerUtilities = [
  ["ΣΥΝΔΕΣΗ", "/login", <Lock />],
  ["ΕΓΓΡΑΦΗ", "/signup", <PersonAdd />],
];

const AppDrawer = ({ anchor, toggleDrawer }) => {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      anchor='right'
      open={anchor}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === "top" || anchor === "bottom",
        })}
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {drawerItems.map(([text, to, icon], index) => (
            <ListItem button key={text} component={Link} to={to}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {drawerUtilities.map(([text, to, icon], index) => (
            <ListItem button key={text} component={Link} to={to}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default AppDrawer;
