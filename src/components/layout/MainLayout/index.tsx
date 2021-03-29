import styled from 'styled-components'
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

      .input-search {
        cursor: pointer;
        text-align: center;
        align-self: flex-end;
        width: 80px;
        border-bottom: 2px solid var(--white);
        padding-bottom: 6px;
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

const Layout: React.FC = ({ children }) => {
  return (
    <MainLayout>
      <header>
        <div className='container'>
          <img className='logo' src={LogoWhite} alt='LogoWhite' />
          <div className='input-search'>
            <img src={searchWhite} alt='searchWhite' />
          </div>
        </div>
      </header>
      <main className='content container'>{children}</main>
      <footer />
    </MainLayout>
  )
}

export default Layout
