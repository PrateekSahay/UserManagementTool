import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useHistory } from 'react-router';
//import { withRouter } from 'react-router';

const useStyles = makeStyles({
  drawer: {
    width: "190px"
  }
});

const Drawer = (props: any) => {
  //const { history } = props;
  const history = useHistory();
  const classes = useStyles();
  const itemsList = [
    {
      text: "Home",
      icon: <InboxIcon />,
      onClick: () => history.push("/")
    },
    {
      text: "About",
      icon: <MailIcon />,
      onClick: () => history.push("/card")
    },
    {
      text: "Contact",
      icon: <MailIcon />,
      onClick: () => history.push("/contact")
    }
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
    <div>
      <h1>Gleason</h1>
    </div>
    <div>
    <MUIDrawer variant="permanent" className={classes.drawer}>
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </MUIDrawer>   
    </div> 
    </div>
  );
};

export default Drawer;
