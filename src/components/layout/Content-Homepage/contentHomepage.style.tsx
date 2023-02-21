import styled from 'styled-components'

export const Content = styled.div`
  section {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    .top-left {
      flex: 1;
    }
    .top-right {
      flex: 1;
    }

    @media screen and (min-width: 1024px) {
      &.new {
        flex-direction: row;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 30px;
      }

      .top-right {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 30px;
      }
      &.article {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 30px;
      }
    }
  }
`
