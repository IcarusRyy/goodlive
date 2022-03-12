import React, { useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import MyRoutes from '../routes'
import { Provider } from 'react-redux'
import { todoStore } from './redux/stroe'
const App = () => {
  return (
    <Provider store={todoStore}>
      <Router>
        <Switch>
          {/* v5 */}
          {MyRoutes.map((item) => (
            <Route key={item.key} path={item.path} component={item.component} exact />
          ))}
          <Redirect from="*" to={'/'} />
        </Switch>
      </Router>
    </Provider>
  )
}
export default App
