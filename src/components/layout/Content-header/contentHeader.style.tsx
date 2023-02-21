import styled from 'styled-components'

export const LayoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  .filter {
    display: flex;
    align-items: center;
    span {
      display: none;
      margin-left: 7px;

      @media screen and (min-width: 768px) {
        display: block;
      }
    }

    select {
      margin-left: 10px;
      border: none;
      border-bottom: 1px solid var(--black);
      height: 40px;
      width: 100px;
      max-width: 200px;

      @media screen and (min-width: 1024px) {
        width: 200px;
      }
    }
  }
`
