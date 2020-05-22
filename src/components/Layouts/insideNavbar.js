import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import logo from './logo.svg';
//import './App.css';
import LoginCompom from "../Home/login";
//import login from "./components/login-component.component";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from "./header";
import Sidebar from "./sidebar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

class insideNavbar extends Component {

    constructor(props) {
        super();
        this.classes = useStyles
        this.state = {
            errors: {},
            IsFormValid: false,
            email: '',
            password: '',
            redirect: false,
            authError: false,
            isLoading: false
        };
    }

    change() {
        debugger;
        return <Redirect to='/login' />
    }
    render() {
        return (


            <div className={this.classes.root}>
                <CssBaseline />
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: this.classes.drawerPaper,
                    }}
                >
                    <Sidebar />
                </Drawer>
                <main className={this.classes.content}>
                    <Container maxWidth="lg" className={this.classes.container}>
                        <Typography>I'm the content</Typography>
                    </Container>
                </main>
            </div>

            //             <div>
            //             <Header/>
            //             <div id="wrapper">
            //                 <Sidebar></Sidebar>
            //                 <div id="content-wrapper">

            // <h1>sas</h1>
            //                     <footer className="sticky-footer">
            //                         <div className="container my-auto">
            //                             <div className="copyright text-center my-auto">
            //                                 <span>Copyright © Your Website 2019</span>
            //                             </div>
            //                         </div>
            //                     </footer>
            //                 </div>
            //             </div>
            //         </div>


        );
    }
}

export default insideNavbar;



















// import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link,Redirect } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// //import logo from './logo.svg';
// //import './App.css';
// import LoginCompom from "./login";
// //import login from "./components/login-component.component";
// import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Divider from '@material-ui/core/Divider';
// import Drawer from '@material-ui/core/Drawer';
// import Hidden from '@material-ui/core/Hidden';
// import IconButton from '@material-ui/core/IconButton';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import MailIcon from '@material-ui/icons/Mail';
// import MenuIcon from '@material-ui/icons/Menu';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles, useTheme } from '@material-ui/core/styles';

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   drawer: {
//     [theme.breakpoints.up('sm')]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   appBar: {
//     [theme.breakpoints.up('sm')]: {
//       width: `calc(100% - ${drawerWidth}px)`,
//       marginLeft: drawerWidth,
//     },
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

// class insideNavbar extends Component {

//     constructor(props) {
//         super();

//         const { window } = props;
//         this.classes = useStyles;
//         this.theme = useTheme;
//         //const [mobileOpen, setMobileOpen] = React.useState(false);

//         // this.handleDrawerToggle = () => {
//         //   setMobileOpen(!mobileOpen);
//         // };

//         this.drawer = (
//             <div>
//               <div className={this.classes.toolbar} />
//               <Divider />
//               <List>
//               <Link to={"/"} className="nav-link">
//                                      logout
//                             </Link>
//                 {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//                   <ListItem li key={text}>
//                     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//                     <ListItemText primary={text} />
//                   </ListItem>
//                 ))}
//               </List>
//               <Divider />
//               <List>
//                 {['All mail', 'Trash', 'Spam'].map((text, index) => (
//                   <ListItem button key={text}>
//                     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//                     <ListItemText primary={text} />
//                   </ListItem>
//                 ))}
//               </List>
//             </div>
//           );
//           this.container = window !== undefined ? () => window().document.body : undefined;



//         this.state = {
//             errors: {},
//             IsFormValid: false,
//             email: '',
//             password: '',
//             redirect: false,
//             authError: false,
//             isLoading: false
//         };
//     }

//     change() {
//         debugger;
//         return <Redirect to='/login' />
//     }
//     render() {
//         return (

//             <div className={this.classes.root}>
//             <CssBaseline />
//             <AppBar position="fixed" className={this.classes.appBar}>
//               <Toolbar>
//                 <IconButton
//                   color="inherit"
//                   aria-label="open drawer"
//                   edge="start"
//                   onClick={this.handleDrawerToggle}
//                   className={this.classes.menuButton}
//                 >
//                   <MenuIcon />
//                 </IconButton>
//                 <Typography variant="h6" noWrap>
//                   Responsive drawer
//                 </Typography>
//               </Toolbar>
//             </AppBar>
//             <nav className={this.classes.drawer} aria-label="mailbox folders">
//               {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//               <Hidden smUp implementation="css">
//                 <Drawer
//                   container={this.container}
//                   variant="temporary"
//                   anchor={this.theme.direction === 'rtl' ? 'right' : 'left'}
//                   open={this.mobileOpen}
//                   onClose={this.handleDrawerToggle}
//                   classes={{
//                     paper: this.classes.drawerPaper,
//                   }}
//                   ModalProps={{
//                     keepMounted: true, // Better open performance on mobile.
//                   }}
//                 >
//                   {this.drawer}
//                 </Drawer>
//               </Hidden>
//               <Hidden xsDown implementation="css">
//                 <Drawer
//                   classes={{
//                     paper: this.classes.drawerPaper,
//                   }}
//                   variant="permanent"
//                   open
//                 >
//                   {this.drawer}
//                 </Drawer>
//               </Hidden>
//             </nav>
//             <main className={this.classes.content}>
//               <div className={this.classes.toolbar} />
//               <Typography paragraph>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//                 ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//                 facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//                 gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
//                 donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
//                 adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
//                 Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
//                 imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//                 arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//                 donec massa sapien faucibus et molestie ac.
//               </Typography>
//               <Typography paragraph>
//                 Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
//                 facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
//                 tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
//                 consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
//                 vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
//                 hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
//                 tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
//                 nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
//                 accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
//               </Typography>
//             </main>
//           </div>

//                 // <div>
//                 //     <nav className="navbar navbar-expand navbar-dark bg-dark">
//                 //         <a href="/employeesd" className="navbar-brand">
//                 //             bezKoder
//                 //         </a>
//                 //         <div className="navbar-nav mr-auto">
//                 //             <li className="nav-item">
//                 //                 <Link to={"/employeesd"} className="nav-link">
//                 //                     Employees
//                 //                  </Link>
//                 //             </li>
//                 //             <li className="nav-item">
//                 //                 <Link to={"/navtest"} className="nav-link">
//                 //                     Add
//                 //                 </Link>
//                 //             </li>
//                 //             <li className="nav-item">
//                 //                 <Link to={"/"} className="nav-link">
//                 //                     logout
//                 //                 </Link>
//                 //             </li>
//                 //             <button onClick={() => this.change()}> change message</button>
//                 //         </div>
//                 //     </nav>
//                 // </div>
//         );
//     }
// }

// export default insideNavbar;
