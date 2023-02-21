import styled from 'styled-components'

export const Content = styled.section`
  margin-top: 30px;
  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }
`
