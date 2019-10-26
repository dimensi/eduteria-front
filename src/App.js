import React from 'react'
import { useStore } from 'effector-react'
import { BrowserRouter as Router, Switch, Redirect, Route, useRouteMatch } from 'react-router-dom'
import { Spin } from 'antd'

import { $authStore } from 'src/store/auth'
import { Login } from 'src/views/Login'
import { DefaultLayout } from 'src/components/DefaultLayout'
import { Registration } from 'src/views/Registration'
import { Player } from 'src/features/Player'
import { VideoPage } from 'src/views/VideoPage'

function PagesWithLayout() {
  const { inCheckingAuth, isAuth } = useStore($authStore)
  const isLogin = useRouteMatch('/login')
  const isRegistration = useRouteMatch('/registration')
  return (
    <DefaultLayout hideSider={inCheckingAuth || isLogin || isRegistration}>
      {inCheckingAuth && (
        <div className='loader'>
          <Spin size='large' />
        </div>
      )}
      {!isAuth && !inCheckingAuth && (
        <>
          {!isLogin && !isRegistration && <Redirect to='/login' />}
          <Route path='/login' component={Login} />
          <Route path='/registration' component={Registration} />
        </>
      )}
      {isAuth && !inCheckingAuth && (isLogin || isRegistration) && (
        <>
          <Redirect from='/login' to='/' />
          <Redirect from='/registration' to='/' />
        </>
      )}
      <Route path='/video/:id' component={VideoPage} />
    </DefaultLayout>
  )
}
function App() {
  return (
    <Switch>
      <Route path='/play/:id' component={Player} />
      <Route component={PagesWithLayout} />
    </Switch>
  )
}

export default () => (
  <Router>
    <App />
  </Router>
)
