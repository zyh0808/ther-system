import React, {Suspense} from 'react'
import './App.less'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Home from './pages/Home'
import { authRoutes, unAuthRoutes } from './router'
 

const renderRoutes = (routes) => {
  // console.log(routes)
  return routes.map((route) => {
    if (route.routes) {
      return (
      <Route path={route.path} key={route.id}>
        { 
          renderRoutes(route.routes)
        }
      </Route>
      )
    }
    return (
      <Route path={route.path} exact={route.exact} key={route.id}>
        {
          route.redirect ?
            <Redirect to={route.redirect} from={route.path}/>
            :
            route.component
        }
      </Route>
    )
  })
}

const App = () => {
    
  return (
    <Router>
      <Switch>
        <Route path={'/'} exact >
          <Redirect to={'/login'}/>
        </Route>
        {/* <Route path={'/ther'} >
            <Home>
                {
                  renderRoutes(authRoutes)
                }
              </Suspense> 
            </Home>
          </Switch>
        </Route> */}
        <Route path={'/admin'} >
          <Home>
            <Switch>
              <Suspense fallback={<>loading...</>}>
                {
                  renderRoutes(authRoutes)
                }
              </Suspense>
            </Switch>
          </Home>
        </Route>
        <Suspense fallback={<></>}>
          <Switch>
            {
              unAuthRoutes.map((route) => (
                <Route path={route.path} key={route.id} exact={route.exact}>
                  {
                    route.component
                  }
                </Route>
              ))
            }
          </Switch>
        </Suspense>
      </Switch>
    </Router>
  )
}

export default App
