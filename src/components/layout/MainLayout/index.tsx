import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import LogoWhite from 'assets/Logo-white.png'
import searchWhite from 'assets/search-icon@2x.svg'

const MainLayout = styled.div`
  header {
    background-color: var(--primary);
    height: 130px;
    .container {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .logo {
        cursor: pointer;
      }
      .input-search {
        cursor: pointer;
        text-align: center;
        align-self: flex-end;
        width: 80px;
        border-bottom: 2px solid var(--white);
        padding-bottom: 6px;
      }

      .input-icon {
        position: absolute;
        right: 30px;
        bottom: 26px;
      }

      input {
        &::placeholder {
          color: #5e82bc;
        }
        color: var(--white);

        align-self: flex-end;
        background-color: var(--secondary);
        width: 80px;
        width: 120px;
        height: 30px;
        border: none;
        border-bottom: 2px solid var(--white);
        padding: 0px 12px;
      }
    }
  }
  main {
    min-height: 800px;
    background: var(--bg-color);
  }
  footer {
    height: 200px;
    background-color: var(--primary);
  }
`

type IPropsLayout = {
  onSearch: (val: string) => void
}

const Layout: React.FC<IPropsLayout> = ({ children, onSearch }) => {
  const [showSearch, setShowSearch] = useState(false)
  const history = useHistory()
  return (
    <MainLayout>
      <header>
        <div className='container'>
          <img
            className='logo'
            src={LogoWhite}
            alt='LogoWhite'
            onClick={() => history.push('/')}
          />
          {showSearch ? (
            <>
              <input
                type='text'
                onChange={(e) => onSearch(e.target.value)}
                placeholder='Search all news'
              />
              <img className='input-icon' src={searchWhite} alt='searchWhite' />
            </>
          ) : (
            <div
              onClick={() => setShowSearch(!showSearch)}
              className='input-search'
            >
              <img src={searchWhite} alt='searchWhite' />
            </div>
          )}
        </div>
      </header>
      <main className='content container'>{children}</main>
      <footer />
    </MainLayout>
  )
}

export default Layout
