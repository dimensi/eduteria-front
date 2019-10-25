import React, { useState } from 'react'
import { Layout, Menu, Icon } from 'antd'

import { fxLogout } from 'src/store/auth'

const { Sider } = Layout

function useMode(key, initialValue) {
  const [mode, setMode] = useState(() => {
    const mode = window.localStorage.getItem(key)
    return mode === 'true' || initialValue
  })
  const setValue = value => {
    window.localStorage.setItem(key, value)
    setMode(value)
  }
  return [mode, setValue]
}

export function DefaultLayout({ children, hideSider }) {
  const [isCollapsed, setCollapse] = useMode('sidebar', false)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!hideSider && (
        <Sider
          collapsible
          collapsed={isCollapsed}
          onCollapse={setCollapse}
          breakpoint='lg'
          collapsedWidth='0'
        >
          <div className='logo'>{isCollapsed ? 'Edu' : 'EduTeria'}</div>
          <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            <Menu.Item key='1'>
              <Icon type='pie-chart' />
              <span>Stats</span>
            </Menu.Item>
            <Menu.Item key='2' onClick={fxLogout}>
              <Icon type='logout' />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
      )}
      <Layout>{children}</Layout>
    </Layout>
  )
}
