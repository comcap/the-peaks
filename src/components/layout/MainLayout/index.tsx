import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Search } from 'components/input'

import LogoWhite from 'assets/Logo-white.png'

import { MainLayout } from './mainLayout.style'

type IPropsLayout = {
  children: JSX.Element
  onSearch: (val: string) => void
}

const Layout: React.FC<IPropsLayout> = ({ children, onSearch }) => {
  const [showSearch, setShowSearch] = useState<boolean>(false)

  return (
    <MainLayout>
      <header>
        <div className="container">
          <Link to={'/'} reloadDocument>
            <img className="logo" src={LogoWhite} alt="LogoWhite" />
          </Link>
          <Search
            showSearch={showSearch}
            onSearch={(keyword) => {
              if (!keyword) {
                setShowSearch(!showSearch)
              } else {
                onSearch(keyword)
              }
            }}
            onOpen={() => setShowSearch(!showSearch)}
            onBlur={() => setShowSearch(!showSearch)}
          />
        </div>
      </header>
      <main className="content container">{children}</main>
      <footer />
    </MainLayout>
  )
}

export default Layout
