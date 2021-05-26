import React from 'react';
import './App.less';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Login from './pages/login'
import Home from './pages/home'

const App = () => {
    
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={'/'} exact><Home/></Route>
          <Route path={'/login'}><Login/></Route>
          <Route path={'/home'}><Home/></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
