import { Button } from 'antd'
import React, { useEffect } from 'react'
import Img from './static/img/1.png'
import './app.less'
import {
  BrowserRouter as Router,
  Link,
  Route,
  // Routes,
  // Navigate,
  // useNavigate,
  Switch,
  Redirect,
} from 'react-router-dom'
// import { Switch } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import MyRoutes from '../routes'
import { Provider } from 'react-redux'
import { todoStore } from './redux/stroe'
// const Redirect = ({ to }) => {
//   const navigate = useNavigate()
//   useEffect(() => {
//     navigate(to)
//   })
//   return null
// }
// const digui = (arr) => {
//   console.log(arr, 'arr')
//   return arr.map((item: any) => (
//     <Route key={item.key} path={item.path} element={<item.component />}>
//       {item.children?.length > 0 && digui(item.children)}
//     </Route>
//   ))
// }
const App = () => {
  return (
    <Provider store={todoStore}>
      {/* <h1>My React and TypeScript App!</h1>
    <Button type="primary">按钮</Button>
    <Button type="link">Link Button</Button>
    <div>
      <img src={require('./static/img/1.png')} alt="" className="imgdiv" />
    </div>
    <div className="box">
      <h1 className="h1font">bg</h1>
    </div> */}
      <Router>
        <Switch>
          {/* v5 */}
          {MyRoutes.map((item) => (
            <Route key={item.key} path={item.path} component={item.component} exact />
          ))}
          <Redirect from="*" to={'/'} />

          {/* <Route path="*" element={<Navigate to="/" replace={true} />} /> */}

          {/* <Route path="*" element={<Redirect to="/" />} /> */}

          {/* <Route path="/" element={<Home />} />
          <Route path="about/*" element={<About />} /> */}
          {/* {MyRoutes.map((item) => (
            <Route key={item.key} path={item.path} element={<item.component />} />
          ))} */}
          {/* {digui(MyRoutes)} */}
        </Switch>
      </Router>
    </Provider>
  )
}
export default App
