import styled from 'styled-components'

import font from 'core/utils/font.theme'

import { ArticleStyleType } from './type'

export const ArticleStyle = styled.div<ArticleStyleType>`
  position: relative;
  cursor: pointer;
  border-bottom: 2px solid var(${(props) => props.colorSection});
  background-color: var(--darkslateblue);
  box-shadow: 0px 0px 10px 2px #ccc;
  min-height: 160px;
  margin-bottom: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => `${props.height && `height: ${props.height}px;`}`}
  ${(props) => `${props.flex && `flex: ${props.flex};`}`}

&.mr-30 {
    margin-right: 30px;
  }

  &.h-100 {
    height: 255px;
  }

  &.span-12 {
    grid-column: 1/13;
  }
  &.span-6 {
    grid-column: 1/7;
  }
  &.span-3 {
    grid-column: 1/4;
  }
  &.row-2 {
    grid-row: 1/3;
  }

  .img-thumbnail {
    max-width: 100%;
    max-height: 100%;

    width: 100%;
    object-fit: cover;
    height: 100%;
  }
  .img-default {
    max-width: 100%;
    max-height: 100%;

    height: 60px;
  }

  .content {
    width: 100%;
    height: 36%;
    position: absolute;
    bottom: 0;
    background-color: var(--darkslateblueOpacity);
    color: var(--white);
    padding-bottom: 14px;
    overflow: hidden;

    &.only-title {
      height: 100%;
      padding-bottom: 0;
    }

    .body {
      display: block;
      padding: 0 14px;
      font-size: ${font.FONT_SIZE_14}px;
    }

    .title {
      margin: 0;
      height: auto;
      font-size: ${font.FONT_SIZE_24}px;
      padding: 14px 14px 5px 14px;
    }
  }

  @media screen and (min-width: 1024px) {
    margin-bottom: 0px;
    &.h-100 {
      height: 100%;
    }
  }
`
