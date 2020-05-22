import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from '../Home/login';
import ReactDOM from 'react-dom'
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
import Header from "../Layouts/header";
import Sidebar from "../Layouts/sidebar";

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

class ClassComp extends Component {

    constructor() {
        super()
        this.classes = useStyles
        this.state = {
            message: "hello brother"
        }
    }
    change() {
        debugger;
        if (this.state.message == "hello brother") {
            this.setState({
                message: "how are you?"
            })
        }
        else {
            this.setState({
                message: "hello brother"
            })
        }

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

            // <Router>
            // <div>
            // <Sidebar></Sidebar>
            //     <h2> class component {this.state.message}</h2>
            //     <Link to={"/test"} className="nav-link">
            //                         Login
            //                     </Link>
            //     <button onClick={() => this.change()}> change message</button>
            //              <Switch>
            //                 <Router exact path="/test" component={Login} />
            //             </Switch>
            // </div>
            // </Router>
        )
    }
}

export default ClassComp