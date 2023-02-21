import styled from 'styled-components'

import font from 'core/utils/font.theme'

export const Content = styled.div`
  padding-top: 60px;

  .date {
    font-size: ${font.FONT_SIZE_12};
  }
  .detail {
    margin-top: 20px;
    display: flex;

    figcaption {
      color: var(--darkgray);
      font-size: ${font.FONT_SIZE_12};
    }

    .content-detail {
      width: 100%;

      @media screen and (min-width: 1024px) {
        width: 50%;
      }

      .body {
        width: 100%;
        font-size: ${font.FONT_SIZE_14};
        img {
          width: 100%;
          height: auto;
        }

        p {
          margin: 16px 0;
        }
      }
    }
    .thumbnail-inside-detail {
      display: block;

      @media screen and (min-width: 1024px) {
        display: none;
      }
      img {
        width: auto;
        height: 260px;
      }
    }

    .thumbnail-outside-detail {
      width: 50%;
      display: none;
      margin-top: 25%;

      @media screen and (min-width: 1024px) {
        display: block;
      }
      img {
        width: 100%;
        height: auto;
      }
    }
  }
`
