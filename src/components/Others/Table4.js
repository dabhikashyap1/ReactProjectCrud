// import React, { Component } from 'react';
// //import Header from "../elements/header";
// import Sidebar from "./sidebar";
// import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios';
// import Container from '@material-ui/core/Container'
// import Typography from '@material-ui/core/Typography'

// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Header from "./header";
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Drawer from '@material-ui/core/Drawer';
// import {MDCDataTable} from '@material/data-table';

// const drawerWidth = 240;

// const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//     },
//     drawer: {
//         [theme.breakpoints.up('sm')]: {
//             width: drawerWidth,
//             flexShrink: 0,
//         },
//     },
//     appBar: {
//         [theme.breakpoints.up('sm')]: {
//             width: `calc(100% - ${drawerWidth}px)`,
//             marginLeft: drawerWidth,
//         },
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//         [theme.breakpoints.up('sm')]: {
//             display: 'none',
//         },
//     },
//     // necessary for content to be below app bar
//     toolbar: theme.mixins.toolbar,
//     drawerPaper: {
//         width: drawerWidth,
//     },
//     content: {
//         flexGrow: 1,
//         padding: theme.spacing(3),
//     },
// }));



// export default class Index extends Component {
//     state = {
//         employees: [],
//         toDashboard: false,
//         isLoading: false
//     };

//     constructor(props) {
//         super(props);
//         this.classes = useStyles
//         this.url = 'https://localhost:44377/api/Employee/GetEmployees';
//         // this.token = localStorage.getItem('token');
//     }

//     componentDidMount() {
//         axios.get(this.url)
//             .then(response => {
//                 //                const employees = response.data.data.employees;
//                 const employees = response.data;
//                 this.setState({ employees });
//             })
//             .catch(error => {
//                 this.setState({ toDashboard: true });
//                 console.log(error);
//             });
//     }

//     handleClickDelete = event => {
//         debugger;
//         const url = "https://localhost:44377/api/Employee/DeleteEmployee";
//         // { params: { token: this.token}}
//         axios.delete(url + '/' + event.target.value)
//             .then(response => {
//                 this.componentDidMount();
//                 this.setState({ isLoading: true })
//             })
//             .catch(error => {
//                 console.log(error.toString());
//                 this.setState({ toDashboard: true });
//             });
//     };

//     render() {
//         // if (this.state.toDashboard === true) {
//         //     return <Redirect to='/' />
//         // }
//         if (localStorage.getItem('isLoggedIn') != "true") {
//             return <Redirect to='/' />
//         }
//         return (
//             <div className={this.classes.root}>
//                 <CssBaseline />
//                 <Drawer
//                     variant="permanent"
//                     classes={{
//                         paper: this.classes.drawerPaper,
//                     }}
//                 >
//                     <Sidebar />
//                 </Drawer>
//                 <div class="mdc-data-table">
//   <table class="mdc-data-table__table" aria-label="Dessert calories">
//     <thead>
//       <tr class="mdc-data-table__header-row">
//         <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Dessert</th>
//         <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Carbs (g)</th>
//         <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Protein (g)</th>
//         <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Comments</th>
//       </tr>
//     </thead>
//     <tbody class="mdc-data-table__content">
//       <tr class="mdc-data-table__row">
//         <td class="mdc-data-table__cell">Frozen yogurt</td>
//         <td class="mdc-data-table__cell mdc-data-table__cell--numeric">24</td>
//         <td class="mdc-data-table__cell mdc-data-table__cell--numeric">4.0</td>
//         <td class="mdc-data-table__cell">Super tasty</td>
//       </tr>
//       <tr class="mdc-data-table__row">
//         <td class="mdc-data-table__cell">Ice cream sandwich</td>
//         <td class="mdc-data-table__cell mdc-data-table__cell--numeric">37</td>
//         <td class="mdc-data-table__cell mdc-data-table__cell--numeric">4.33333333333</td>
//         <td class="mdc-data-table__cell">I like ice cream more</td>
//       </tr>
//       <tr class="mdc-data-table__row">
//         <td class="mdc-data-table__cell">Eclair</td>
//         <td class="mdc-data-table__cell mdc-data-table__cell--numeric">24</td>
//         <td class="mdc-data-table__cell mdc-data-table__cell--numeric">6.0</td>
//         <td class="mdc-data-table__cell">New filing flavor</td>
//       </tr>
//     </tbody>
//   </table>
// </div>
//             </div>


//         );
//     }
// }
