import { useMemo } from 'react'
import get from 'lodash/get'
import ReactHtmlParser from 'react-html-parser'

import styled from 'styled-components'
import LogoWhite from 'assets/Logo-white.png'
import font from 'core/utils/font.theme'
import { IArticle } from './type'

type ArticleStyleType = {
  flex?: string
  span?: string
  height?: string
  colorSection: string
}

type ColorSection = {
  news: string
  sport: string
  culture: string
  lifeandstyle: string
}

const ArticleStyle = styled.div<ArticleStyleType>`
  position: relative;
  cursor: pointer;
  border-bottom: 2px solid var(${(props) => props.colorSection});
  background-color: var(--darkslateblue);
  box-shadow: 0px 0px 10px 2px #ccc;
  min-height: 160px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => `${props.height && `height: ${props.height}px;`}`}
  ${(props) => `${props.flex && `flex: ${props.flex};`}`}

  &.mr-30 {
    margin-right: 30px;
  }

  &.h-100 {
    height: 100%;
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

  /* @media screen and (min-width: 768px) {
    min-height: 360px;
  }

  @media screen and (min-width: 1024px) {
    margin-bottom: 0px;
    min-height: 300px;
  }

  @media screen and (min-width: 1440px) {
    height: 300px;
  } */

  .img-thumbnail {
    max-width: 100%;
    max-height: 100%;

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
`

const ArticleComponent: React.FC<IArticle> = ({
  onClick,
  className,
  title,
  body,
  thumbnail,
  flex,
  span,
  height,
  isOnlyTitle,
  section
}) => {
  const color = useMemo<ColorSection>(
    () => ({
      news: '--seagreen',
      sport: '--sizzling-watermelon',
      culture: '--bumblebee',
      lifeandstyle: '--button-blue'
    }),
    []
  )

  return (
    <ArticleStyle
      colorSection={get(color, section, '--seagreen')}
      flex={flex}
      height={height}
      span={span}
      onClick={onClick}
      className={className}>
      {!isOnlyTitle ? (
        thumbnail ? (
          <img className="img-thumbnail" src={thumbnail} alt="thumbnail" />
        ) : (
          <img className="img-default" src={LogoWhite} alt="thumbnail" />
        )
      ) : null}
      <div className={isOnlyTitle ? 'content only-title' : 'content'}>
        <h2 className="title">{title}</h2>
        <p className="body">
          <>{body && ReactHtmlParser(body)}</>
        </p>
      </div>
    </ArticleStyle>
  )
}

export default ArticleComponent
