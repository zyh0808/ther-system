import React, {Suspense} from 'react'
import './App.less'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
// import { IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store'

import Home from './pages/Home'
import { authRoutes, unAuthRoutes } from './router'
 
const App = () => {
    
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path={'/'} exact component={Home} >
            <Redirect to={'/login'}/>
          </Route>
          <Route path={'/ther'} >
            <Switch>
              <Home>
                <Suspense fallback={<>loading...</>}>
                  {
                    authRoutes.map((route) => {
                        if (route.routes) {
                            return (
                                <div key={route.id}>
                                    {
                                        route.routes.map((r) => (
                                            <Route path={r.path} exact={r.exact} key={r.id}>
                                                {r.component}
                                            </Route>
                                        ))
                                    }
                                </div>
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
                </Suspense>
              </Home>
            </Switch>
          </Route>
          <Route>
            {
              unAuthRoutes.map((route) => (
                <Route path={route.path} key={route.id} exact={route.exact}>
                    {
                        route.component
                    }
                </Route>
            ))
            }
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
