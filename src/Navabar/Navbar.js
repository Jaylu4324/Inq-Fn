import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Outlet, useNavigate } from 'react-router-dom';

import MailIcon from '@mui/icons-material/Mail';

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);
  const Nav=useNavigate("")
  
  let arr=["/dashBoard/","/dashBoard/Add Course","/dashBoard/CourInq",'/dashBoard/Batch-For-Course',"/dashBoard/Invoice","/dashBoard/Studentdetails","/dashBoard/Events","/dashBoard/einquiries","/dashBoard/Old","/dashBoard/Batches","/dashBoard/Completedcourse"]

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[ 'Dashboard','Add Course','Course-Inquiries','Add Batches-Course', 'Invoice', 'Student Details','Events','Event Inquiries','Completed Events','Add Batches-Events','Completed-courses'].map(
          (text, index) => (
            <ListItem key={text} disablePadding onClick={()=>{Nav(`${arr[index]}`)}}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      
    </Box>
  );

  return (
    <>
    <Box sx={{ flexGrow: 1 ,mb:4}}>
      <AppBar position="static">
        <Toolbar>
          
            <MenuIcon  onClick={toggleDrawer(true)}/>
      

          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,textAlign:'center'}}>
            Tech Nishal
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      <Outlet/>
      </>
  );
}
