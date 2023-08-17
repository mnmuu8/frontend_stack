import React, { FC, useContext } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { LayoutProps } from '@/types/types'
import AppContext from '@/context/AppContext'
import UserAuthentication from '../atoms/UserAuthentication'

const Layout: FC<LayoutProps> = ({ children }) => {

  const appContext = useContext(AppContext);
  const {drawerOpen} = appContext;

  const mainStyle: React.CSSProperties = {
    width: drawerOpen ? 'calc(100% - 240px)' : '',
    left: drawerOpen ? 'auto' : 0,
  }

  return (
    <>
      <UserAuthentication>
        <Header />
      </UserAuthentication>
      <Sidebar />
      <main style={mainStyle}>{children}</main>
    </>
  )
}

export default Layout
