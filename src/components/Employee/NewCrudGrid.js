import React, { Component } from 'react';
import MaterialTable from "material-table";
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
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import '@material-ui/icons'
import {CSVLink, CSVDownload} from 'react-csv';

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
        isLoading: false,
        Namesearch: '',
        EmpidSearch: ''
    };

    constructor(props) {
        super(props);
        this.classes = useStyles
        this.url = 'https://localhost:44377/api/Employee/GetEmployees';
        this.handleNameChange = this.handleNameChange.bind();
        this.handleEmpidChange = this.handleEmpidChange.bind();
        this.handleSearch = this.handleSearch.bind(this);

        // this.token = localStorage.getItem('token');
    }

    componentDidMount() {
        debugger;
        const header = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': "Bearer " + localStorage.getItem("token"),
        }
        axios.get(this.url, { headers: header })
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

    handleClickDelete = (event, id) => {
        debugger;
        const header = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': "Bearer " + localStorage.getItem("token"),
        }
        const url = "https://localhost:44377/api/Employee/DeleteEmployee";
        // { params: { token: this.token}}
        axios.delete(url + '/' + id, { headers: header })
            .then(response => {
                this.componentDidMount();
                this.setState({ isLoading: true })
            })
            .catch(error => {
                console.log(error.toString());
                this.setState({ toDashboard: true });
            });
    };

    handleClickEdit = (event, id) => {
        event.preventDefault();
        // return( <Redirect to = {{ pathname: 'edit', search: '?id=' + id }} />)
        this.props.history.push({ pathname: 'edit', search: '?id=' + id });
    };

    handleNameChange = event => {
        this.setState({ Namesearch: event.target.value });
    };
    handleEmpidChange = event => {
        this.setState({ EmpidSearch: event.target.value });
    };


    handleSearch = (event) => {
        event.preventDefault();

        var data1 = {
            fullName: this.state.Namesearch,
            empCode: this.state.EmpidSearch,
            sortBy: null,
            pageSize: null,
            currentIndex: null,
        };
                //const url = 'https://localhost:44377/api/Employee/SearchEmployees';
                const url = 'https://localhost:44377/api/Employee/SrchEmp';
        debugger;
        // return fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers:{
        //         'Content-Type': 'application/json',
        //         'Authorization': "Bearer " + localStorage.getItem("token"),
        //         'Access-Control-Allow-Origin': '*',
        //             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //     }
        //     })
        //     .then(res => res.json())
        //     .then((apiResponse)=>{ 
        //         console.log("api response", apiResponse) 
        //         return {
        //             type: "REGISTER_USER",
        //             api_response: apiResponse.data
        //         }
        //     })
        //     .catch(function (error) {
        //         return {
        //             type: "REGISTER_USER",
        //             api_response: {success: false}
        //         }
        //     })
        var data = {
            FullName: "",
            Mobile: "",
            Empcode: "",
            Position: "",
            EmployeeId: ""
        };
        const header = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        


        
        axios.post(this.url,data, {
            headers: header
        })
        // axios.post(this.url, data, {
        //     headers: header
        // })
            .then(response => {
                const employees = response.data;
                this.setState({ employees });
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
    };

    render() {

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
                        <br ></br>
                        <br ></br>
                        <br ></br>
                        <br ></br>
                        {/* <Header/> */}
                        <div id="wrapper">
                            <div id="content-wrapper">
                                <div className="container-fluid">
                                    <ol className="breadcrumb">

                                        {/* <li className="breadcrumb-item">
                                                <Link to={'/dashboard'} >Dashboard</Link>
                                            </li> */}
                                        <li className="breadcrumb-item active">CRUD App</li>
                                        <li className="ml-auto"><Link to={'add'}>Add Employee</Link><br /><CSVLink data={this.state.employees} >Download CSV</CSVLink></li>
                                    </ol>
                                    <div className="card mb-12">
                                        <div className="">
                                            <div className="card-header">Search Employee</div>
                                            <div className="card-body">
                                                <form onSubmit={this.handleSearch} noValidate>
                                                    {/* <div className="form-group">
                                                        <div className="form-row">
                                                            <div className="col-md-4">
                                                                <div className="form-label-group">
                                                                    <input type="text" id="inputPosition" className="form-control" placeholder="Enter Position" required="required" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-label-group">
                                                                    <input type="number" id="inputPhone" className="form-control" placeholder="Enter Phone" required="required" pattern="[0-9]*" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-label-group">
                                                                    <input type="number" id="inputEmpid" className="form-control" placeholder="Emp Id" required="required" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div className="form-group">
                                                        <div className="form-row">
                                                            <div className="col-md-4">
                                                                <div className="form-label-group">
                                                                    <input type="text" id="inputName" className="form-control" placeholder="Enter name" onChange={this.handleNameChange} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-label-group">
                                                                    <input type="text" id="inputEmpcode" className="form-control" placeholder="Emp Code" onChange={this.handleEmpidChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8"></div>
                                                    <button className="btn btn-primary btn-block col-md-4" type="submit" disabled={this.state.isLoading ? true : false}>Search  &nbsp;&nbsp;&nbsp;
                                                    <span>(api is not working yet)</span>
                                            {/* {isLoading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : (
                                                    <span></span>
                                                )} */}
                                                    </button>
                                                </form>
                                            </div>
                                        </div>


                                        <div className="card-header"><i className="fas fa-table"></i>
                                            &nbsp;&nbsp;Employees List
                                </div>
                                        <div className="card-body">
                                        
                                            <MaterialTable
                                                //className="table table-bordered"
                                                // title="Positioning Actions Column Preview"
                                                title=""
                                                columns={[
                                                    { title: 'Name', field: 'fullName' },
                                                    { title: 'Phone Number', field: 'mobile' },
                                                    { title: 'Employee Id', field: 'employeeId', type: 'numeric' },
                                                    {
                                                        title: 'Emp Code',
                                                        field: 'empcode',
                                                        // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                                                    },
                                                    { title: 'Position', field: 'position' },

                                                ]}
                                                data={this.state.employees}
                                                actions={[
                                                    rowData => ({
                                                        icon: 'edit',
                                                        tooltip: 'Edit Employee',
                                                        className: "btn btn-sm btn-info",
                                                        // onClick: (event, rowData) => alert("You saved " + rowData.name)
                                                        onClick: (event, rowData) => {
                                                            event.preventDefault();
                                                            this.handleClickEdit(event, rowData.employeeId);
                                                            // return <Redirect to = {{ pathname: 'edit', search: '?id=' + rowData.employeeId }} />
                                                        }
                                                    }),
                                                    rowData => ({
                                                        icon: 'delete',
                                                        tooltip: 'Delete Employee',
                                                        onClick: (event, rowData) => {
                                                            event.preventDefault();
                                                            this.handleClickDelete(event, rowData.employeeId);
                                                        }
                                                        // disabled: rowData.birthYear < 2000
                                                    })

                                                ]}
                                                options={{
                                                    actionsColumnIndex: -1
                                                }}
                                            />  </div>
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