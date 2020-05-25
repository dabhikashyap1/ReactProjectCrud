import React, {Component} from 'react';
import Header from "../Layouts/header";
import Sidebar from "../Layouts/sidebar";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={1} variant="filled" {...props} />;
  }


export default class AddPage extends Component {

    state = {
        redirect: false,
        toDashboard: false,
        isLoading: false,
        erroradd:false
    };

    handleSubmit = event => {
        debugger;
        event.preventDefault();
        this.setState({isLoading: true});
        const token = localStorage.getItem('token');
        const url = 'https://localhost:44377/api/Employee/AddEmployee';
        const name = document.getElementById('inputName').value;
        const phone = document.getElementById('inputPhone').value;
        const empcode = document.getElementById('inputEmpcode').value;
        const position = document.getElementById('inputPosition').value;
        //const empid = document.getElementById('inputEmpid').value;

        // let bodyFormData = new FormData();
        // bodyFormData.set('name', name);
        // bodyFormData.set('phone', phone);
        // bodyFormData.set('email', email);
        // bodyFormData.set('location', location);
        // bodyFormData.set('emp_id', empid);
        // bodyFormData.set('company', company);
        // bodyFormData.set('token', token);
        // axios.post(url, bodyFormData)
        var data = {
            FullName: name,
            Mobile: phone,
            Empcode: empcode,
            Position: position,
            EmployeeId: 0
        };
        const header = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': "Bearer " + localStorage.getItem("token"),
          }
        axios.post(url, data,{headers: header})
            .then(result => {
                if (result.status == 200) {
                    this.setState({redirect: true, isLoading: false})
                }
            })
            .catch(error => {
                this.setState({ erroradd: true })
                //this.setState({ toDashboard: true });
                //return <Redirect to='/crudgrid' />
                this.setState({isLoading: false})
                console.log(error);
            });
    };

    renderRedirect = () => {
        debugger;
        if (this.state.redirect) {
            return <Redirect to='/crudgrid' />
        }
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ erroradd: false })
      };

    render() {
        const isLoading = this.state.isLoading;
        // if (this.state.toDashboard === true) {
        //     return <Redirect to='/' />
        // }
        if (localStorage.getItem('isLoggedIn') != "true") {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                        <br />
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/crudgrid'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Add</li>
                            </ol>
                            {this.state.erroradd && <Alert severity="error" onClose={this.handleClose}>Error while adding data.</Alert>}

                        </div>
                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Employee Add</div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
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
                                                        <input  maxLength="10" minLength="10" type="text" id="inputPhone" className="form-control" placeholder="Enter Phone" required="required" pattern="[0-9]*"/> 
                                                        <label htmlFor="inputPhone">Enter Phone</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                {/* <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputEmpid" className="form-control" placeholder="Email address" required="required" disabled />
                                                        <label htmlFor="inputEmpid">Emp id</label>
                                                    </div>
                                                </div> */}
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputEmpcode" className="form-control" placeholder="Enter EmpCode" required="required" />
                                                        <label htmlFor="inputEmpcode">Emp code</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputPosition" className="form-control" placeholder="Enter position" required="required" />
                                                        <label htmlFor="inputPosition">Enter position</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Add Employee &nbsp;&nbsp;&nbsp;
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
                                    <span>Copyright © Your Website <div>{(new Date().getFullYear())}</div></span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}
