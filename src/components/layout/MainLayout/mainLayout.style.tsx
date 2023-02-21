import styled from 'styled-components'

export const MainLayout = styled.div`
  header {
    background-color: var(--primary);
    height: 130px;
    .container {
      height: 100%;
      display: flex;
      align-items: center;

      justify-content: flex-end;

      flex-direction: column;
      .logo {
        cursor: pointer;
        margin-bottom: 10px;
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

  @media screen and (min-width: 1024px) {
    header {
      height: 130px;

      .container {
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
`
