import React from 'react'
import { useStore } from 'effector-react'
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom'
import { Spin } from 'antd'

import { $authStore } from 'src/store/auth'
import { Login } from 'src/views/Login'
import { DefaultLayout } from 'src/components/DefaultLayout'
import { Registration } from 'src/views/Registration'

function App() {
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
      <Switch>
        {!isAuth && !inCheckingAuth && (
          <>
            {!isLogin && !isRegistration && <Redirect to='/login' />}
            <Route path='/login' component={Login} />
            <Route path='/registration' component={Registration} />
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
