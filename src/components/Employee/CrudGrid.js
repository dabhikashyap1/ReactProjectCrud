import React, { Component } from 'react';
//import Header from "../elements/header";
import Sidebar from "../Layouts/sidebar";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from "../Layouts/header";
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';

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



export default class Index extends Component {
    state = {
        employees: [],
        toDashboard: false,
        isLoading: false
    };

    constructor(props) {
        super(props);
        this.classes = useStyles
        this.url = 'https://localhost:44377/api/Employee/GetEmployees';
        // this.token = localStorage.getItem('token');
    }

    componentDidMount() {
        axios.get(this.url)
            .then(response => {
                //                const employees = response.data.data.employees;
                const employees = response.data;
                this.setState({ employees });
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
    }

    handleClickDelete = event => {
        debugger;
        const url = "https://localhost:44377/api/Employee/DeleteEmployee";
        // { params: { token: this.token}}
        axios.delete(url + '/' + event.target.value)
            .then(response => {
                this.componentDidMount();
                this.setState({ isLoading: true })
            })
            .catch(error => {
                console.log(error.toString());
                this.setState({ toDashboard: true });
            });
    };

    render() {
        // if (this.state.toDashboard === true) {
        //     return <Redirect to='/' />
        // }
        if (localStorage.getItem('isLoggedIn') != "true") {
            return <Redirect to='/' />
        }
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

                        {/* <Header/> */}
                        <div id="wrapper">
                            <div id="content-wrapper">
                                <div className="container-fluid">

                                    <div className="card mb-3">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                {/* <Link to={'/dashboard'} >Dashboard</Link> */}
                                            </li>
                                            <li className="breadcrumb-item active">CRUD App</li>
                                            <li className="ml-auto"><Link to={'add'}>Add Employee</Link></li>
                                        </ol>
                                        <ol className="breadcrumb">
                                            {/* <li className="breadcrumb-item">
                                                <Link to={'/dashboard'} >Dashboard</Link>
                                            </li> */}
                                            <li className="breadcrumb-item active">CRUD App</li>
                                            <li className="ml-auto"><Link to={'add'}>Add Employee</Link></li>
                                        </ol>
                                        <div className="card-header"><i className="fas fa-table"></i>
                                            &nbsp;&nbsp;Employees List
                                </div>
                                        <div className="card-body">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>id</th>
                                                        <th>Name</th>
                                                        <th>Phone No</th>
                                                        <th>Emp ID</th>
                                                        <th>Emp Code</th>
                                                        <th>Position</th>
                                                        <th className="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.employees.map((employees, index) =>
                                                        <tr key={employees.employeeId}>
                                                            <td>{index + 1}</td>
                                                            <td>{employees.fullName}</td>
                                                            <td>{employees.mobile}</td>
                                                            <td>{employees.employeeId}</td>
                                                            <td>{employees.empcode}</td>
                                                            <td>{employees.position}</td>
                                                            <td className="text-center">
                                                                <Link className="btn btn-sm btn-info" to={{ pathname: 'edit', search: '?id=' + employees.employeeId }}>Edit</Link>
                                                                &nbsp; | &nbsp;
                                                        <button value={employees.employeeId} className="btn btn-sm btn-danger" disabled={index === 0 ? true : false} onClick={this.handleClickDelete} >Delete</button>
                                                            </td>
                                                        </tr>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                                    </div>
                                </div>
                                <footer className="sticky-footer">
                                    <div className="container my-auto">
                                        <div className="copyright text-center my-auto">
                                            <span>Copyright © Your Website 2019</span>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </div>

                    </Container>
                </main>
            </div>


        );
    }
}
