import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';

import WorkIcon from '@mui/icons-material/Work';


export const mainListItems = (
  <React.Fragment>
    <ListItemButton onClick={(e) => {
                e.preventDefault();
                window.location.href='http://localhost:3000/dashboard';
                }} >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText sx={{fontFamily:"Mulish"}} primary="Dashboard"/>
    </ListItemButton>
    <ListItemButton onClick={(e) => {
                e.preventDefault();
                window.location.href='http://localhost:3000/university';
                }}>
      <ListItemIcon>
        <SchoolIcon/>
      </ListItemIcon>
      <ListItemText primary="Universities" />
    </ListItemButton>
    <ListItemButton onClick={(e) => {
                e.preventDefault();
                window.location.href='http://localhost:3000/student';
                }}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Students" />
    </ListItemButton>
    <ListItemButton onClick={(e) => {
                e.preventDefault();
                window.location.href='http://localhost:3000/teacher';
                }}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Teachers" />
    </ListItemButton>
    <ListItemButton onClick={(e) => {
                e.preventDefault();
                window.location.href='http://localhost:3000/course';
                }}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Courses" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/*<ListSubheader component="div" inset>
      Saved reports
</ListSubheader>*/}
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    <ListItemButton onClick={(e) => {
                e.preventDefault();
                window.location.href='http://localhost:3000/login';
                }}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log-out" />
    </ListItemButton>
  </React.Fragment>
);