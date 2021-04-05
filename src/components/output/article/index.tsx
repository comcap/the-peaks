import htmlParser from 'react-html-parser'
import styled from 'styled-components'
import LogoWhite from 'assets/Logo-white.png'

export type IArticle = {
  title: string
  thumbnail?: string
  body?: string
  className?: string
  onClick?: () => void
}

export type IResArticles = {
  id: string
  type: string
  sectionId: string
  sectionName: string
  webPublicationDate: Date
  webTitle: string
  webUrl: string
  apiUrl: string
  isHosted: boolean
  pillarId: string
  pillarName: string
  fields?: {
    thumbnail: string
    bodyText: string
    headline: string
    body: string
    main: string
  }
}

const ArticleStyle = styled.div`
  position: relative;
  cursor: pointer;
  margin-bottom: 30px;
  border-bottom: 2px solid var(--crimson);
  background-color: var(--darkslateblue);
  box-shadow: 0px 0px 10px 2px #ccc;
  min-height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    min-height: 360px;
  }

  @media screen and (min-width: 1024px) {
    margin-bottom: 0px;
    min-height: 300px;
  }

  @media screen and (min-width: 1440px) {
    height: 300px;
  }

  .img-thumbnail {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
  .img-default {
    width: auto;
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

    .body {
      max-height: 30px;
      overflow: hidden;
      padding: 0 14px;
      p {
        font-size: 0.8em;
        padding: 0;
      }
    }

    p {
      height: auto;
      font-size: 1.2em;
      padding: 14px;
    }
  }
`

export const Article: React.FC<IArticle> = ({
  onClick,
  className,
  title,
  body,
  thumbnail,
}) => {
  return (
    <ArticleStyle onClick={onClick} className={className}>
      {thumbnail ? (
        <img className='img-thumbnail' src={thumbnail} alt='thumbnail' />
      ) : (
        <img className='img-default' src={LogoWhite} alt='thumbnail' />
      )}
      <div className='content'>
        <p className='title'>{title}</p>
        <div className='body'>{body && htmlParser(body)[0]}</div>
      </div>
    </ArticleStyle>
  )
}
