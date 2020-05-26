import React from 'react'
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from "react-router-dom";
import WorkIcon from '@material-ui/icons/Work';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const AppMenu = () => {
  const classes = useStyles()
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openinside, setOpeninside] = React.useState(false)

  function handleClick() {
    setOpeninside(!openinside)
  }
  function handleDrawerOpen() {
    setOpen(true);
  };

  function handleDrawerClose() {
    setOpen(false);
  };

  function handleClickLogout(){
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', false);
   // this.setState({ toDashboard: true });
   //return <Redirect to='/' />
   window.location.href = "/"
}

//   if (localStorage.getItem('isLoggedIn') != "true") {
//     return <Redirect to='/' />
// }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Menu
      </Typography>
      {/* <button color="inherit">Login</button> */}

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader} >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List component="nav" className={classes.appMenu} disablePadding>
          <ListItem button component="a" href="/crudgrid" className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Employee Data" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <IconShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <IconPeople />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <IconBarChart />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
        {/* <Divider /> */}
        <List component="nav" className={classes.appMenu} disablePadding>

          <ListItem button className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <IconShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>

          <ListItem button className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <IconPeople />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
          <ListItem button onClick={handleClick} className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <IconLibraryBooks />
            </ListItemIcon>
            <ListItemText primary="Nested Tabs" />
            {openinside ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openinside} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem button className={classes.menuItem}>
                <ListItemText inset primary="Nested Tab 1" />
              </ListItem>
              <ListItem button className={classes.menuItem}>
                <ListItemText inset primary="Nested Tab 2" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button className={classes.menuItem}  onClick={handleClickLogout}>
            <ListItemIcon className={classes.menuItemIcon} >
              <ExitToAppSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        
        </List>
      </Drawer>


      {/* <List component="nav" className={classes.appMenu} disablePadding>
      <ListItem button component="a" href="/crudgrid" className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconDashboard />
        </ListItemIcon>
        <ListItemText primary="CRUD" />
      </ListItem>
      

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconShoppingCart />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconPeople />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconBarChart />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button onClick={handleClick} className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconLibraryBooks />
        </ListItemIcon>
        <ListItemText primary="Nested Pages" />
        {open ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Nested Page 1" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Nested Page 2" />
          </ListItem>
        </List>
      </Collapse>
    </List>*/}
    </div>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    drawerHeader:{
      color: '#97c05c',
   },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      //  color: '#97c05c',
        color: '#3f51b5',
    },
  }),
)

export default AppMenu
