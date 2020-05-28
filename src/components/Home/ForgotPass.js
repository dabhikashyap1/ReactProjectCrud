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

    constructor(props) {
        super(props);
        this.style = makeStyles;
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        //const [open, setOpen] = React.useState(false);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            errors: {},
            IsFormValid: false,
            username: '',
            redirect: false,
            authError: false,
            isLoading: false,
            showSuccessAlert: false,
            showFailAlert: false,
            open: false,
            erroropen: false,
            failmsg: ''
        };
    }
   

    handleEmailChange = event => {
        this.setState({ username: event.target.value });
    };
    handlePwdChange = event => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = event => {
        this.setState({ open: true })
        this.setState({ showSuccessAlert: false, showFailAlert: false });
        debugger;
        let errors = {};
        event.preventDefault();

        if (!this.state.username || this.state.username == "undefined") {
            errors["username"] = "Email can not be empty";
            this.setState({ errors: errors });
        }
        else if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.username))) {
            errors["username"] = "Email is not valid";
            this.setState({ errors: errors });
        }
       
        else {
            errors = {};
            this.setState({ errors: errors });
            this.setState({ isLoading: true });
            const url = 'https://localhost:44377/api/ApplicationUser/Login';
            const username = this.state.username;
            var data = {
                UserName: username,
            };
            // axios.post(url, data)
            //     .then(result => {
            //         if (result.status == 200) {
            //             this.setState({ open: true })

            //             localStorage.setItem('token', result.data.token);
            //             this.setState({ redirect: true, isLoading: false, showSuccessAlert: true });
            //             localStorage.setItem('isLoggedIn', true);
            //             // this.renderRedirect();
            //             // alert.show("Success");
            //               window.location.href = "/crudgrid"
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error.response.data.message);
            //         debugger;
            //         //  alert.show("Fail");
            //         //this.setOpen(true);
            //         this.setState({ erroropen: true, failmsg: error.response.data.message })

            //         this.setState({ showSuccessAlert: false, showFailAlert: true });
            //         this.setState({ authError: true, isLoading: false });
            //     });
        }


    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
        this.setState({ erroropen: false, failmsg: '' })
    };

    renderRedirect = () => {

        if (this.state.redirect) {

            return <Redirect to='/crudgrid' />
        }
    };


    render() {
        const isLoading = this.state.isLoading;
        const { classes } = this.props;


        return (

            <Container component="main" maxWidth="xs">
                {this.state.erroropen &&
                    <Alert severity="error" onClose={this.handleClose}>{this.state.failmsg}</Alert>
                }
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <CssBaseline />
                <div className={this.style.paper}>
                    <Typography component="h1" variant="h5">
                        Forgot Password
              </Typography>
                    <form onSubmit={this.handleSubmit} className={this.style.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Email Id"
                            name="username"
                            autoComplete="Email Id"
                            autoFocus
                            onChange={this.handleEmailChange}
                        />
                        
                        <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
                    
                        <span style={{ color: "red" }}>{this.state.errors["formsubmit"]}</span>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.style.submit}
                        >
                            Send Email
                       </Button>
                        <br />
                        <br />

                        <Grid container>
                            <Grid item xs>
                                <Link to="/" variant="body2">
                                    Back to Sign In
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
        );
    }
}








