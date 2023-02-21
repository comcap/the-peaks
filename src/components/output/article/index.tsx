import get from 'lodash/get'
import { useMemo } from 'react'
import ReactHtmlParser from 'react-html-parser'

import LogoWhite from 'assets/Logo-white.png'

import { ArticleStyle } from './article.style'
import { ColorSection, IArticle } from './type'

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
        <span className="body">
          <>{body && ReactHtmlParser(body)}</>
        </span>
      </div>
    </ArticleStyle>
  )
}

export default ArticleComponent
