import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import { Link, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import AlertMessageBox from '../Layouts/AlertMessage'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={1} variant="filled" {...props} />;
  }
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

//export default function SignUp() {
    export default class Register extends Component {
        constructor() {
            super();
            this.classes = makeStyles;
            this.handleEmailChange = this.handleEmailChange.bind(this);
            this.handleNameChange = this.handleNameChange.bind(this);
            this.handleRoleChange = this.handleRoleChange.bind(this);
            this.handlePwdChange = this.handlePwdChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleClose  = this.handleClose.bind(this);
            //this.renderRedirect = this.renderRedirect.bind(this);
    
            this.state = {
                errors: {},
                IsFormValid: false,
                email: '',
                name: '',
                role: '',
                password: '',
                redirect: false,
                authError: false,
                isLoading: false,
                errorsignup:false
            };
        }

    

    //classes = useStyles();

    handleEmailChange = event => {
        debugger;
        this.setState({ email: event.target.value });
    };
    handleNameChange = event => {
        this.setState({ name: event.target.value });
    };
    handleRoleChange = event => {
        this.setState({ role: event.target.value });
    };
    handlePwdChange = event => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = event => {
        debugger;
        event.preventDefault();
        let errors = {};
        if (!this.state.email || this.state.email == "undefined") {
            errors["email"] = "Email can not be empty";
            this.setState({ errors: errors });
        }
        else if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email))) {
            errors["email"] = "Email is not valid";
            this.setState({ errors: errors });
        }
        else if (!this.state.name || this.state.name == "undefined") {
            errors["name"] = "Name can not be empty";
            this.setState({ errors: errors });
        }
        else if (!this.state.password || this.state.password == "undefined") {
            errors["password"] = "Password can not be empty.";
            this.setState({ errors: errors });
        }
        //else if (!((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/).test(this.state.email))) {
            else if (!((this.state.password).match((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/)))) {
            errors["password"] = "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.";
            this.setState({ errors: errors });
        }
        else{
            errors = {};
            this.setState({ errors: errors });
            this.setState({ isLoading: true });
            const url = 'https://localhost:44377/api/ApplicationUser/PostApplicationUser';
            var data = {
                UserName :this.state.email,
                Email  :this.state.email,
                 Password  :this.state.password,
                 FullName  :this.state.name,
                 Role  :"user",
            };
        
            axios.post(url, data)
                .then(result => {
                    this.setState({ isLoading: false });
                    if (result.status == 200) {
                        this.setState({ redirect: true, authError: true });
                        window.location.href = "/";
                    } else {
                        this.setState({ redirect: false, authError: true });
                    }
                })
                .catch(error => {
                    this.setState({ errorsignup: true });
                    console.log(error);
                    this.setState({ authError: true, isLoading: false });
                });
        }
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ errorsignup: false })
      };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
    };
    render() {
    return (
        <Container component="main" maxWidth="xs">
            {this.state.errorsignup && <Alert severity="error" onClose={this.handleClose}>Signup Failed.</Alert>}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            <CssBaseline />
            <div className={this.classes.paper}>
                {/* <Avatar className={this.classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar> */}
                <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                <form onSubmit={this.handleSubmit} className={this.classes.form} noValidate>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required="required"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoFocus
                                autoComplete="email"
                                onChange={this.handleEmailChange}
                            //inputProps={{ pattern: '/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/' }}
                            />
                        </Grid>
                        <span style={{ color: "red",marginLeft:"15px" }}>{this.state.errors["email"]}</span>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required="required"
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                autoComplete="name"
                                onChange={this.handleNameChange}
                            />
                        </Grid>
                        <span style={{ color: "red",marginLeft:"15px"  }}>{this.state.errors["name"]}</span>
                        {/* <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required="required"
                                fullWidth
                                id="role"
                                label="Role"
                                name="role"
                                autoComplete="role"
                                onChange={this.handleRoleChange}
                            />
                        </Grid>
                        <span style={{ color: "red",marginLeft:"15px"  }}>{this.state.errors["role"]}</span> */}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required="required"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={this.handlePwdChange}
                                //inputProps={{ pattern: "[a-zA-Z0-9!@#$%^*_|]{6,25}" }}                
                                autoComplete="current-password"
                            />
                        </Grid>
                        <span style={{ color: "red",marginLeft:"15px"  }}>{this.state.errors["password"]}</span>

                    </Grid>
                    <br />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={this.classes.submit}
                    >
                        Sign Up
                   </Button>
                   <br />
                   <br />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to={'/'} >Already have an account? Sign in</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            {this.renderRedirect()}
        </Container>
    );}

}