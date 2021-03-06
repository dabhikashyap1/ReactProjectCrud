import React, { Component } from 'react';
import MaterialTable, { MTablePagination } from "material-table";
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
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import '@material-ui/icons'
import { CSVLink, CSVDownload } from 'react-csv';
import { RemoveCircleOutlineOutlined as RemoveCircleIcon } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import MenuIcon from '@material-ui/icons/Menu';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import WorkIcon from '@material-ui/icons/Work';
import TablePagination from '@material-ui/core/TablePagination';
import { Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


function Alert(props) {
    return <MuiAlert elevation={1} variant="filled" {...props} />;
}

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
    formControl: {
        margin: theme.spacing(3),
    },
}));


export default class Index extends Component {


    constructor(props) {
        super(props);
        debugger;
        this.state = {
            employees: [],
            toDashboard: false,
            isLoading: false,
            Namesearch: '',
            EmpidSearch: '',
            actionsColumnIndex: -1,
            pageSize: localStorage.getItem('pagesize') ? localStorage.getItem('pagesize') : 5,
            currentPageindex: 0,
            successdelete: false,
            eerrordelete: false,
            namechk: true,
            phnchk: true,
            empcodechk: true,
            empidchk: true,
            positionchk: true,
            anchorElshowhide: null
        };
        this.classes = useStyles
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmpidChange = this.handleEmpidChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);


        // this.token = localStorage.getItem('token');
    }

    componentDidMount() {
        debugger;
        const url = 'https://localhost:44377/api/Employee/GetEmployees';

        const header = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': "Bearer " + localStorage.getItem("token"),
        }
        axios.get(url, { headers: header })
            .then(response => {
                // const employees = response.data.data.employees;
                debugger;
                const employees = response.data;
                this.setState({ employees: employees });
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
                this.setState({ isLoading: true, successdelete: true, eerrordelete: false })
                setTimeout(function () {
                    this.componentDidMount();
                }.bind(this), 2000);

            })
            .catch(error => {
                console.log(error.toString());
                this.setState({ successdelete: false, eerrordelete: true });
            });
    };

    handleClickRowDelete = (event, ids) => {
        debugger;
        const header = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': "Bearer " + localStorage.getItem("token"),
        }
        const url = "https://localhost:44377/api/Employee/DeleteEmployees";
        var employeeIdsString = String(ids);
        debugger;
        axios.delete(url + '?employeeIdsString=' + employeeIdsString, { headers: header })
            .then(response => {

                this.setState({ isLoading: true, successdelete: true, eerrordelete: false })
                setTimeout(function () {
                    this.componentDidMount();
                }.bind(this), 2000);
            })
            .catch(error => {
                console.log(error.toString());
                this.setState({ successdelete: false, eerrordelete: true });
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
    handleClearClick = event => {
        this.setState({ Namesearch: '' });
        this.setState({ EmpidSearch: '' });
        document.getElementById('inputName').value = '';
        document.getElementById('inputEmpcode').value = '';

        this.componentDidMount();
    };

    actions = [
        {
            tooltip: 'Remove All Selected Users',
            icon: 'delete',
            //  onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
            onClick: (event, data) => {
                debugger;
                event.preventDefault();
                var employeeIds = data.map(e => e.employeeId).join(",");
                this.handleClickRowDelete(event, employeeIds);
                //  this.handleClickEdit(event, data.employeeId);
                // return <Redirect to = {{ pathname: 'edit', search: '?id=' + rowData.employeeId }} />
            }

        },
        {
            icon: 'edit',
            tooltip: 'Edit Employee',
            className: "btn btn-sm btn-info",
            /// isFreeAction: true,
            position: "row",
            onClick: (event, rowData) => {
                debugger;
                event.preventDefault();
                this.handleClickEdit(event, rowData.employeeId);
                // return <Redirect to = {{ pathname: 'edit', search: '?id=' + rowData.employeeId }} />
            }
        },
        {
            icon: 'delete',
            tooltip: 'Delete Employee',
            position: "row",
            //  isFreeAction: true,
            onClick: (event, rowData) => {
                event.preventDefault();
                this.handleClickDelete(event, rowData.employeeId);
            }
            // disabled: rowData.birthYear < 2000
        },

    ]


    onPageChange = (event) => {
        debugger;
        this.setState({ currentPageindex: event });
        localStorage.setItem('currentPageindex', event)
    }

    onChangeRowsPerPage = (event) => {
        debugger;
        this.setState({ pageSize: event });
        localStorage.setItem('pagesize', event)

    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ successdelete: false, eerrordelete: false })
    };

    handleChangeCheckbox = event => {
        debugger;
        this.setState({ [event.target.name]: event.target.checked });
    };

    handleClickShowhide = (event) => {
        this.setState({ anchorElshowhide: event.currentTarget });

    };

    handleCloseShowhide = () => {
        this.setState({ anchorElshowhide: null });
    };


    handleSearch = (event) => {
        event.preventDefault();

        var data = {
            fullName: this.state.Namesearch,
            empCode: this.state.EmpidSearch,
            sortBy: "fullName",
            pageSize: this.state.pageSize,
            currentIndex: (this.state.currentPageindex),
        };
        const url = 'https://localhost:44377/api/Employee/SearchEmployees';
        debugger;
        const options = {
            method: 'GET',
            params: data,
            headers: {
                'Accept': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json;charset=UTF-8',
                'X-CMC_PRO_API_KEY': 'my api key'
            },
            json: true,
            gzip: true
        };
        const header = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token"),
            //'Access-Control-Allow-Origin': '*',
            //'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        axios.get(url, options)
            .then(response => {
                const employees = response.data.employeeList;
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
                        <br />

                        <div id="wrapper">
                            <div id="content-wrapper">
                                <div className="container-fluid">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item active">CRUD App</li>
                                        <li className="ml-auto"><Link to={'add'}>Add Employee</Link><br /><CSVLink data={this.state.employees} >Download CSV</CSVLink></li>
                                    </ol>
                                    <div className="card mb-12">
                                        <div className="">
                                            {/* <div className="card-header">Search Employee</div> */}
                                            <div className="card-body">
                                                <form onSubmit={this.handleSearch} noValidate>
                                                    <div className="form-group">
                                                        <div className="form-row">
                                                            <div className="col-md-6">
                                                                <div className="form-label-group">
                                                                    <input type="text" id="inputName" className="form-control" placeholder="Enter name" onChange={this.handleNameChange} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-label-group">
                                                                    <input type="text" id="inputEmpcode" className="form-control" placeholder="Emp Code" onChange={this.handleEmpidChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-primary col-md-2" type="submit" disabled={this.state.isLoading ? true : false}>Search  &nbsp;&nbsp;&nbsp;
                                                        {/* {isLoading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : (
                                                    <span></span>
                                                )} */}
                                                    </button>
                                                    &nbsp;&nbsp;
                                                    <button className="btn btn-secondary col-md-2" type="button" onClick={this.handleClearClick}>Clear  &nbsp;&nbsp;&nbsp;
                                                    </button>
                                                </form>

                                            </div>
                                            <button className="btn btn-info col-md-2" aria-haspopup="true" onClick={this.handleClickShowhide}>
                                                Show/hide columns
                                                  </button >
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={this.state.anchorElshowhide}
                                                keepMounted
                                                open={Boolean(this.state.anchorElshowhide)}
                                                onClose={this.handleCloseShowhide}
                                            >
                                                <FormControl component="fieldset" className={this.classes.formControl}>
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={<Checkbox checked={(this.state.namechk)} onChange={this.handleChangeCheckbox} name="namechk" />}
                                                            label="Full Name"
                                                        />
                                                    </FormGroup>
                                                </FormControl>

                                                <FormControl component="fieldset" className={this.classes.formControl}>
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={<Checkbox checked={this.state.phnchk} onChange={this.handleChangeCheckbox} name="phnchk" />}
                                                            label="Phone Number"
                                                        />
                                                    </FormGroup>
                                                </FormControl>
                                                <FormControl component="fieldset" className={this.classes.formControl}>
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={<Checkbox checked={this.state.empidchk} onChange={this.handleChangeCheckbox} name="empidchk" />}
                                                            label="Emp Id"
                                                        />
                                                    </FormGroup>
                                                </FormControl>
                                                <br />
                                                <FormControl component="fieldset" className={this.classes.formControl}>
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={<Checkbox checked={this.state.empcodechk} onChange={this.handleChangeCheckbox} name="empcodechk" />}
                                                            label="Emp code"
                                                        />
                                                    </FormGroup>
                                                </FormControl>
                                                <FormControl component="fieldset" className={this.classes.formControl}>
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={<Checkbox checked={this.state.positionchk} onChange={this.handleChangeCheckbox} name="positionchk" />}
                                                            label="Position"
                                                        />

                                                    </FormGroup>
                                                </FormControl>
                                                {/* <MenuItem onClick={this.handleCloseShowhide}>Profile</MenuItem>
                                                        <MenuItem onClick={this.handleCloseShowhide}>My account</MenuItem>
                                                        <MenuItem onClick={this.handleCloseShowhide}>Logout</MenuItem> */}
                                            </Menu>
                                            {/* <div className="card-header">Show/hide Columns</div>
                                            <FormControl component="fieldset" className={this.classes.formControl}>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Checkbox checked={(this.state.namechk)} onChange={this.handleChangeCheckbox} name="namechk" />}
                                                        label="Full Name"
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                            <FormControl component="fieldset" className={this.classes.formControl}>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Checkbox checked={this.state.phnchk} onChange={this.handleChangeCheckbox} name="phnchk" />}
                                                        label="Phone Number"
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                            <FormControl component="fieldset" className={this.classes.formControl}>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Checkbox checked={this.state.empidchk} onChange={this.handleChangeCheckbox} name="empidchk" />}
                                                        label="Emp Id"
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                            <FormControl component="fieldset" className={this.classes.formControl}>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Checkbox checked={this.state.empcodechk} onChange={this.handleChangeCheckbox} name="empcodechk" />}
                                                        label="Emp code"
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                            <FormControl component="fieldset" className={this.classes.formControl}>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Checkbox checked={this.state.positionchk} onChange={this.handleChangeCheckbox} name="positionchk" />}
                                                        label="Position"
                                                    />

                                                </FormGroup>
                                            </FormControl> */}

                                        </div>


                                        {/* <div className="card-header"><i className="fas fa-table"></i>
                                            &nbsp;&nbsp;Employees List
                                        </div> */}
                                        <div className="card-body">
                                            {this.state.eerrordelete && <Alert severity="error" onClose={this.handleClose}>Error while Deleting data.</Alert>}
                                            {this.state.successdelete && <Alert severity="success" onClose={this.handleClose}>Data Deleted successfully.</Alert>}
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <MaterialTable border="1px solid black" fixedHeader={false} width="auto" tableLayout="auto"
                                                        // // onSearchChange={(e) => alert("search changed: " + e)}
                                                        onChangeRowsPerPage={this.onChangeRowsPerPage}
                                                        // // onOrderChange={(e) => alert("search changed: " + e)}
                                                        onChangePage={this.onPageChange}
                                                        className="table table-bordered"
                                                        // title="Positioning Actions Column Preview"
                                                        title=""
                                                        columns={[
                                                            { title: 'Full Name', field: 'fullName', hidden: (!this.state.namechk) },
                                                            { title: 'Phone Number', field: 'mobile', type: 'numeric', hidden: !this.state.phnchk },
                                                            { title: 'Employee Id', field: 'employeeId', type: 'numeric', hidden: !this.state.empcodechk },
                                                            {
                                                                title: 'Emp Code',
                                                                field: 'empcode',
                                                                hidden: !this.state.empidchk
                                                                // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                                                            },
                                                            { title: 'Position', field: 'position', hidden: !this.state.positionchk },

                                                        ]}
                                                        data={this.state.employees}
                                                        // other props
                                        
                                                        // data={query =>
                                                        //     new Promise((resolve, reject) => {
                                                        //         let url = 'https://localhost:44377/api/Employee/GetEmployees';

                                                        //         let header = {
                                                        //             'Content-Type': 'application/json;charset=UTF-8',
                                                        //             'Authorization': "Bearer " + localStorage.getItem("token"),
                                                        //         }
                                                              
                                                        //       fetch(url, { headers: header })
                                                        //         .then(response => response.json())
                                                        //         .then(result => {
                                                        //             debugger;
                                                        //           resolve({
                                                        //             data: result,
                                                        //             page: 1,
                                                        //             totalCount: result.length,
                                                        //           })
                                                        //         })
                                                        //     })
                                                        //   }
                                                        options={{
                                                           //   pageSize: 2,
                                                            //    initialPage: 3,
                                                            pageSizeOptions:[5, 10, 20, 300],
                                                            actionsColumnIndex: -1,
                                                             pageSize: this.state.pageSize,
                                                            // PageOptions:[5, 10, 20, 300],
                                                              paging:true,
                                                            //   count:2,
                                                              //page:0,
                                                            // initialPage: 0,
                                                             paginationType:'stepped',

                                                            selection: true,
                                                            //  exportButton: true,
                                                            filtering: true,
                                                            headerStyle: {
                                                                backgroundColor: 'lightgray',
                                                                color: 'black',
                                                                border: "1px solid black"
                                                            },
                                                            actionsCellStyle: {
                                                                // backgroundColor: 'lightskyblue',
                                                                color: 'darkgreen',
                                                            }
                                                            // filterCellStyle: {
                                                            //     backgroundColor: 'lightgreen',
                                                            //     color: '#FFF'
                                                            // }
                                                        }}
                                                        
                                                        // components={
                                                        //     {
                                                        //     Pagination: props => (
                                                        //         <MTablePagination {...props}
                                                        //         rowsPerPage={this.state.pageSize}
                                                        //         rowsPerPageOptions={[5, 10, 20, 300]}
                                                        //         count={this.state.employees.length}
                                                        //         page={
                                                        //           1  //this.state.currentPageindex
                                                        //           }
                                                        //         />
                                                            
                                                        //     ),
                                                        //   }
                                                        // }
                                                        icons={{
                                                            Filter: props => (
                                                                <SearchIcon />
                                                            ),
                                                        }}
                                                        actions={this.actions}
                                                    />
                                                </Grid>
                                            </Grid>

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
