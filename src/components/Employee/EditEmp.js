import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Header from "../Layouts/header";
import Sidebar from "../Layouts/sidebar";
import Services from "../../services/userservices"
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props) {
    return <MuiAlert elevation={1} variant="filled" {...props} />;
  }


export default class EditEmp extends Component {

    constructor(props) {
        debugger;
        super(props);
        this.url = 'https://localhost:44377/api/Employee/GetEmployeeById';
        this.token = localStorage.getItem('token');
        this.state = {
            errors: {},
            IsFormValid: false,
            email: '',
            password: '',
            id: '',            
            redirect: false,
            authError: false,
            isLoading: false,
            erroredit:false,
            erroreditmsg:'',
            successedit:false
        };
        //this.componentDidMount = this.componentDidMount.bind();
    }

    // state = {
    //     id: '',
    //     redirect: false,
    //     isLoading: false
    // };

    componentDidMount() {
        debugger;
        //const id = this.props.location.search[4];
        const id = this.props.location.search.split('=')[1];
        const header = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': "Bearer " + localStorage.getItem("token"),
          }
        axios.get(this.url + '/' + id,{headers: header})
            .then(response => {
                debugger;
                const emp = response.data;
                this.setState({ id: emp.employeeId });
                document.getElementById('inputName').value = emp.fullName;
                document.getElementById('inputPhone').value = emp.mobile;
                document.getElementById('inputEmpid').value = emp.employeeId;
                document.getElementById('inputEmpcode').value = emp.empcode;
                document.getElementById('inputPosition').value = emp.position;
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });

    }

    handleSubmit = event => {
        debugger;
        event.preventDefault();
        this.setState({ isLoading: true });
        const token = localStorage.getItem('token');
        const url = 'https://localhost:44377/api/Employee/UpdateEmployee';
        const name = document.getElementById('inputName').value;
        const phone = document.getElementById('inputPhone').value;
        const empcode = document.getElementById('inputEmpcode').value;
        const position = document.getElementById('inputPosition').value;
        const empid = document.getElementById('inputEmpid').value;
        var data = {
            FullName: name,
            Mobile: phone,
            Empcode: empcode,
            Position: position,
            EmployeeId: empid
        };
        const header = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': "Bearer " + localStorage.getItem("token"),
          }
        axios.put(url, data,{headers: header})
            .then(result => {
                debugger;
                if (result.status == 200) {
                    this.setState({ redirect: false,successedit:true, isLoading: false })
                         setTimeout(function(){
                            this.setState({ redirect: true});
                           // window.location.href = "/crudgrid"
                            //return <Redirect to='/crudgrid' />
                           // this.props.history.push('/crudgrid');

                          }.bind(this), 2000);
                }
            })
            .catch(error => {
                console.log(error.response.data.message);
                this.setState({ erroredit: true ,erroreditmsg:error.response.data.message,successedit:false, isLoading: false})
                console.log(error);
            });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ erroredit: false,erroreditmsg:'',successedit:false })
      };

    renderRedirect = () => {
        if (this.state.redirect) {
               return <Redirect to='/crudgrid' />
        }
    };


    render() {
        const isLoading = this.state.isLoading;
        if (localStorage.getItem('isLoggedIn') != "true") {
            return <Redirect to='/' />
        }
        return (
            <div>    
                  {/* <CircularProgress />
                  <CircularProgress color="secondary" /> */}
          
                {/* <Header /> */}
                <br />
                <br />
                <br />
                <br />
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                        <br />
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/crudgrid'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Edit</li>
                            </ol>
                {this.state.erroredit && <Alert severity="error" onClose={this.handleClose}>{this.state.erroreditmsg}</Alert>}
                            {this.state.successedit &&<Alert severity="success" onClose={this.handleClose}>Data edited successfully.</Alert>}
                        </div>
                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Employee Edit</div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputName" className="form-control" placeholder="Enter name" required="required" autoFocus="autofocus" />
                                                        <label htmlFor="inputName">Enter name</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input maxLength="10" minLength="10" type="text"id="inputPhone" className="form-control" placeholder="Enter Phone" required="required" pattern="[0-9]*" />
                                                        <label htmlFor="inputPhone">Enter Phone</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputEmpid" className="form-control" placeholder="Emp Id" required="required" disabled />
                                                        <label htmlFor="inputEmpid">Emp id</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputEmpcode" className="form-control" placeholder="Enter Empcode" required="required" />
                                                        <label htmlFor="inputEmpcode">Emp code</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputPosition" className="form-control" placeholder="Enter Position" required="required" />
                                                        <label htmlFor="inputPosition">Enter Position</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Update Employee &nbsp;&nbsp;&nbsp;
                                            {isLoading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : (
                                                    <span></span>
                                                )}
                                        </button>
                                    </form>
                                    {this.renderRedirect()}
                                </div>
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
            </div>
        );
    }
}


