import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Loadable} from './components/progress'
import '../node_modules/slick-carousel/slick/slick.css'
import './styles/globals.css'
import './styles/react-slick.css'
import {Home} from './components/home'
const LazyError400 = Loadable(import('./components/errors/400'))

const MainRouter = () => {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path='*' component={LazyError400}/>
      </Switch>
    )
}

export default MainRouter
