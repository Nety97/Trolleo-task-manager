import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Signin from './components/SignIn';
import Register from './components/Register'
import Tables from './components/Tables';
import {connect} from 'react-redux';
import Auth from './Auth';
import React from 'react';
import Navbarhome from './components/Navbarhome';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

import DragAndDrop from './components/DragAndDrop';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      
    }
  }
 
  render (){
    return (
      <div className="App">
        <Router>
          
          <Switch>
            <Route exact  path='/tasks' component={Auth(Tables, this.props.token)}/>
            <Route exact path='/tasks/:id' component={Auth(DragAndDrop, this.props.token)}/>
            <Route exact path='/register'>
              <Register />
            </Route>
            <Route exact path='/signin'>
              <Signin/>
            </Route>
            <Route exact path='/'>
              <Navbarhome/>
              <Home/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
  
}

const mapStateToProps = (state)=>{
  return{
      user: state.user,
      token: state.token
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
