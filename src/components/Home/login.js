//import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import TitleComponent from "../Layouts/title";
import AlertMessageBox from '../Layouts/AlertMessage'
//import { withAlert } from 'react-alert'
import SnackbarContent from '@material-ui/core/SnackbarContent';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}

            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


function Alert(props) {
    return <MuiAlert elevation={1} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
}));

const action = (
    <Button color="secondary" size="small">
      lorem ipsum dolorem
    </Button>
  );


export default class Login extends Component {

    constructor() {
        super();
        this.style = makeStyles;
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        //const [open, setOpen] = React.useState(false);
        this.handleClose  = this.handleClose.bind(this);
        this.state = {
            errors: {},
            IsFormValid: false,
            username: '',
            password: '',
            redirect: false,
            authError: false,
            isLoading: false,
            showSuccessAlert: false,
            showFailAlert: false,
            open:false,
            erroropen:false
        };
    }
    // state = {
    //     email: '',
    //     password: '',
    //     redirect: false,
    //     authError: false,
    //     isLoading: false
    // };

    handleEmailChange = event => {
        this.setState({ username: event.target.value });
    };
    handlePwdChange = event => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = event => {
        this.setState({ open: true })
        this.setState({showSuccessAlert:false,showFailAlert:false});
        debugger;
        let errors = {};
        event.preventDefault();

        if (!this.state.username || this.state.username == "undefined") {
            errors["username"] = "User name can not be empty";
            this.setState({ errors: errors });
        }
        // else if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.username))) {
        //     errors["username"] = "Email is not valid";
        //     this.setState({ errors: errors });
        // }
        else if (!this.state.password || this.state.password == "undefined") {
            errors["password"] = "Password can not be empty";
            this.setState({ errors: errors });
        }
        // else if (!this.state.password.match(/^[a-zA-Z]+$/)) {
        //     errors["password"] = "Only letters";
        //     this.setState({ errors: errors });
        // }
        else {
            errors = {};
            this.setState({ errors: errors });
            this.setState({ isLoading: true });
            const url = 'https://localhost:44377/api/ApplicationUser/Login';
            const username = this.state.username;
            const password = this.state.password;
            var data = {
                UserName: username,
                Password: password
            };
            axios.post(url, data)
                .then(result => {
                    if (result.status == 200) {
                        this.setState({ open: true })

                        localStorage.setItem('token', result.data.token);
                        this.setState({ redirect: true, isLoading: false ,showSuccessAlert:true});
                        localStorage.setItem('isLoggedIn', true);
                        // this.renderRedirect();
                       // alert.show("Success");
                        window.location.href = "/crudgrid"
                    }
                })
                .catch(error => {
                    console.log(error);
                    debugger;
                  //  alert.show("Fail");
                  //this.setOpen(true);
                  this.setState({ erroropen: true })
                  
                    this.setState({showSuccessAlert:false,showFailAlert:true});
                    this.setState({ authError: true, isLoading: false });
                });
        }


    };

     handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
        this.setState({ erroropen: false })
      };
      
    renderRedirect = () => {
        debugger;

        if (this.state.redirect) {

            return <Redirect to='/test' />
        }
    };


    render() {
        const isLoading = this.state.isLoading;
        const { classes } = this.props;
        
        
        return (

            <Container component="main" maxWidth="xs">

{/* <Snackbar open={false} autoHideDuration={6000} onClose={this.handleClose}>
        <Alert severity="success" onClose={this.handleClose}>Login successfully.</Alert>
</Snackbar>
<Snackbar open={this.state.erroropen} autoHideDuration={6000} onClose={this.handleClose}>
        <Alert severity="error" onClose={this.handleClose}>Login Failed.</Alert>
</Snackbar> */}
{this.state.erroropen && 
    <Alert severity="error" onClose={this.handleClose}>Login Failed.</Alert>
}

      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <CssBaseline />
                <div className={this.style.paper}>
                    {/* <Avatar className={this.style.avatar}>
                        <LockOutlinedIcon />
                    </Avatar> */}
                    <Typography component="h1" variant="h5">
                        Sign in
              </Typography>
                    <form onSubmit={this.handleSubmit} className={this.style.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="User Name"
                            autoFocus
                            onChange={this.handleEmailChange}
                            className={ (this.state.showFailAlert ? 'is-invalid' : '')}
                        />
                        {/* <span className="invalid-feedback"  style={{ fontSize: "100%" }}>
                                        Please provide a valid Email.
                                    </span> */}
                        <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.handlePwdChange}
                            type="password"
                        />
                        <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                        <span className="invalid-feedback"  style={{ fontSize: "100%" }}>
                                        Please provide a valid Email or Password.
                                    </span>
                        <span style={{ color: "red" }}>{this.state.errors["formsubmit"]}</span>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.style.submit}
                        >
                            Sign In
                       </Button>
                       <br />
                       <br />

                        <Grid container>
                            <Grid item xs>
                                <Link href="/style" variant="body2">
                                    Forgot password?
                          </Link>
                            </Grid>
                            <Grid item>
                                <Link to={'/signup'} >Don't have an account? Sign Up</Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
                {this.renderRedirect()}
            </Container>


            //     <Container component="main" maxWidth="xs">
            //         <CssBaseline />
            //         <div className={this.style.paper}>
            //         <form onSubmit={this.handleSubmit} className={this.style.form}>
            //                             <div className="form-group">
            //                                 <div className="form-label-group">
            //                                     <input className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputEmail" placeholder="Email address" type="text" name="email" onChange={this.handleEmailChange} autoFocus required />
            //                                     <label htmlFor="inputEmail">Email address</label>
            //                                     <div className="invalid-feedback">
            //                                         Please provide a valid Email.
            //             </div>
            //                                 </div>
            //                             </div>
            //                             <div className="form-group">
            //                                 <div className="form-label-group">
            //                                     <input type="password" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputPassword" placeholder="******" name="password" onChange={this.handlePwdChange} required />
            //                                     <label htmlFor="inputPassword">Password</label>
            //                                     <div className="invalid-feedback">
            //                                         Please provide a valid Password.
            //             </div>
            //                                 </div>
            //                             </div>
            //                             <div className="form-group">
            //                                 <div className="checkbox">
            //                                     <label>
            //                                         <input type="checkbox" value="remember-me" />Remember Password
            //             </label>
            //                                 </div>
            //                             </div>
            //                             <div className="form-group">
            //                                 <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Login &nbsp;&nbsp;&nbsp;
            //             {isLoading ? (
            //                                         <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            //                                     ) : (
            //                                             <span></span>
            //                                         )}
            //                                 </button>
            //                             </div>
            //                             <div className="form-group">
            //                                 <div className="form-group">
            //                                     <b>email:</b> gowthaman.nkl1@gmail.com
            //         </div>
            //                                 <div className="form-group">
            //                                     <b>password :</b> password
            //         </div>
            //                             </div>
            //                         </form>

            //             <div className="container">

            //                 <TitleComponent title="React CRUD Login "></TitleComponent>
            //                 <div className="card card-login mx-auto mt-5">
            //                     <div className="card-header">Login</div>
            //                     <div className="card-body">
            //                         <div className="text-center">
            //                             <Link className="d-block small mt-3" to={'register'}>Register an Account</Link>
            //                             <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
            //                         </div>
            //                     </div>
            //                 </div>
            //                 {this.renderRedirect()}
            //             </div>

            //         </div>
            //         <Box mt={8}>
            //             <Copyright />
            //         </Box>
            //     </Container>
        );
    }
}










////// previous code without material ui



// import React, {Component} from 'react';
// import axios from 'axios';
// import {Link, Redirect} from 'react-router-dom';
// import TitleComponent from "./title";
// import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
// import { Face, Fingerprint } from '@material-ui/icons'
// const styles = theme => ({
//     margin: {
//         margin: theme.spacing.unit * 2,
//     },
//     padding: {
//         padding: theme.spacing.unit
//     }
// });

// export default class Login extends Component {

//     state = {
//         email: '',
//         password: '',
//         redirect: false,
//         authError: false,
//         isLoading: false
//     };

//     handleEmailChange = event => {
//         this.setState({email: event.target.value});
//     };
//     handlePwdChange = event => {
//         this.setState({password: event.target.value});
//     };

//     handleSubmit = event => {
//         event.preventDefault();
//         this.setState({isLoading: true});
//         const url = 'https://gowtham-rest-api-crud.herokuapp.com/login';
//         const email = this.state.email;
//         const password = this.state.password;
//         let bodyFormData = new FormData();
//         bodyFormData.set('email', email);
//         bodyFormData.set('password', password);
//         axios.post(url, bodyFormData)
//             .then(result => {
//                 if (result.data.status) {
//                     localStorage.setItem('token', result.data.token);
//                     this.setState({redirect: true, isLoading: false});
//                     localStorage.setItem('isLoggedIn', true);
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//                 this.setState({authError: true, isLoading: false});
//             });
//     };

//     renderRedirect = () => {
//         if (this.state.redirect) {
//             return <Redirect to='/dashboard'/>
//         }
//     };

//     render() {
//         const isLoading = this.state.isLoading;
//         const { classes } = this.props;
//         return (

//             <div className="container">

//                 <TitleComponent title="React CRUD Login "></TitleComponent>
//                 <div className="card card-login mx-auto mt-5">
//                     <div className="card-header">Login</div>
//                     <div className="card-body">
//                         <form onSubmit={this.handleSubmit}>
//                             <div className="form-group">
//                                 <div className="form-label-group">
//                                     <input className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputEmail" placeholder="Email address" type="text" name="email" onChange={this.handleEmailChange} autoFocus required/>
//                                     <label htmlFor="inputEmail">Email address</label>
//                                     <div className="invalid-feedback">
//                                         Please provide a valid Email.
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <div className="form-label-group">
//                                     <input type="password" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputPassword" placeholder="******" name="password" onChange={this.handlePwdChange} required/>
//                                     <label htmlFor="inputPassword">Password</label>
//                                     <div className="invalid-feedback">
//                                         Please provide a valid Password.
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <div className="checkbox">
//                                     <label>
//                                         <input type="checkbox" value="remember-me"/>Remember Password
//                                     </label>
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Login &nbsp;&nbsp;&nbsp;
//                                     {isLoading ? (
//                                         <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
//                                     ) : (
//                                         <span></span>
//                                     )}
//                                 </button>
//                             </div>
//                             <div className="form-group">
//                                 <div className="form-group">
//                                     <b>email:</b> gowthaman.nkl1@gmail.com
//                                 </div>
//                                 <div className="form-group">
//                                     <b>password :</b> password
//                                 </div>
//                             </div>
//                         </form>
//                         <div className="text-center">
//                             <Link className="d-block small mt-3" to={'register'}>Register an Account</Link>
//                             <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
//                         </div>
//                     </div>
//                 </div>
//                 {this.renderRedirect()}
//             </div>
//         );
//     }
// }


//export default withAlert()(Login);