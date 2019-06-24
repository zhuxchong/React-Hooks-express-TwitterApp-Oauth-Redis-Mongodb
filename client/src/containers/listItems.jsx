import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";

const MainListItems = props => {
  return Object.keys(props.items).map((i, index) => {
    return (
      <div key={index} onClick={() => props.setOptionSelect(i)}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={props.items[i]} />
        </ListItem>
      </div>
    );
  });
};

export default MainListItems;
