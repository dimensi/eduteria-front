import React from 'react'
import { useStore } from 'effector-react'
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom'
import { Spin } from 'antd'

import { $authStore } from 'src/store/auth'
import { Login } from 'src/views/Login'
import { DefaultLayout } from 'src/components/DefaultLayout'

function App() {
  const { inCheckingAuth, isAuth } = useStore($authStore)
  const isLogin = useRouteMatch('/login')
  return (
    <DefaultLayout hideSider={inCheckingAuth || isLogin}>
      {inCheckingAuth && (
        <div className='loader'>
          <Spin size='large' />
        </div>
      )}
      <Switch>
        {!isAuth && !inCheckingAuth && (
          <>
            <Redirect to='/login' />
            <Route path='/login' component={Login} />
          </>
        )}
        {isAuth && !inCheckingAuth && (
          <>
            <Redirect from='/login' to='/' />
            <Redirect from='/registration' to='/' />
          </>
        )}
      </Switch>
    </DefaultLayout>
  )
}

export default App
