import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import Fdas from './components/Others/Greet'
//import { Greet } from './components/Greet'
import Classcomp from './components/Others/ClassComponent'
import LoginCompom from './components/Home/login'
import NavComponent from './components/Layouts/insideNavbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CrudGrid from "./components/Employee/NewCrudGrid";
//import login from "./components/login-component.component";
import Editemp from "./components/Employee/EditEmp";
import AddEmp from "./components/Employee/AddEmp";
import Greet from './components/Others/Greet';
import Signup from './components/Home/Signup';
import TableTest from './components/Others/Table4'
import Table2 from './components/Others/Table2'
import ForgotPass from './components/Home/ForgotPass'


function App() {
  return (
    <div className="App">
      {/* <Classcomp />
      <Fdas /> */}
      <Router >
        <Switch>
          <Route exact path='/' component={LoginCompom} />
          <Route  path="/add" component={AddEmp} />
          <Route  path='/crudgrid' component={CrudGrid} />
          <Route  path='/edit/' component={Editemp} />
          <Route  path='/signup' component={Signup} />          
          <Route  path='/forgotpassword' component={ForgotPass} />  
               
          {/*    <Route path='*' component={NotFound} /> 
                   <Route exact path='/test' component={NavComponent} />
                   <Route exact path='/navtest' component={Greet} />
                   <Route exact path='/tables' component={TableTest} />  
                  <Route exact path='/table2' component={Table2} />  
          */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
