import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import HtmlParser from 'react-html-parser'
import moment from 'moment'

import bookMark from 'assets/bookmarkon-icon@2x.svg'
import { Button } from 'components/input'
import { SnackBar } from 'components/output'
import { getByID } from 'core/action/collection'
import { Layout } from 'components/layout'

const Content = styled.div`
  padding-top: 60px;

  .date {
    font-size: 0.6em;
  }
  .detail {
    margin-top: 20px;
    display: flex;

    figcaption {
      color: var(--darkgray);
      font-size: 0.5em;
    }

    .content-detail {
      width: 100%;

      @media screen and (min-width: 1024px) {
        width: 50%;
      }

      .body {
        width: 100%;
        font-size: 14px;
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
        width: auto;
        height: 260px;
      }
    }
  }
`

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
    headline: string
    body: string
    main: string
  }
}

export type ILocation = {
  id: string
}

const onSearch = (val: string) => {
  console.log(`val`, val)
}

const getArticle = (id: string) => {
  return getByID(`/${id}`, {
    'show-fields': `thumbnail,headline,body,main`,
    'show-elements': `image,audio`,
  }).then((response) => response)
}

const formatDate = (userDate: Date) => {
  const dateTime = moment(userDate)
    .tz('Europe/London')
    .format('ddd DD MMM YYYY HH.MM zz')
    .toLocaleUpperCase()
  return dateTime
}

const ArticlePage: React.FC = () => {
  const location = useLocation<ILocation>()
  const [articles, setArticles] = useState<IResArticles>()
  // const [showSnackBar, setShowSnackBar] = useState<boolean>(false)
  // const [showSnackBar, setShowSnackBar] = useState<string>(
  //   localStorage.getItem('bookmarks')
  // )
  // localStorage.setItem('bookmarks',)
  const onClickBookmark = () => {
    console.log(`articles`, articles?.apiUrl)
    setShowSnackBar(true)
    setTimeout(() => {
      setShowSnackBar(false)
    }, 3000)
  }

  useEffect(() => {
    async function fetchAPI() {
      const news = await getArticle(location.state.id)
      setArticles(news)
    }

    fetchAPI()
  }, [location])

  return (
    <Layout onSearch={onSearch}>
      <Content>
        <SnackBar message='the article has been save' show={showSnackBar} />
        <Button onClick={() => onClickBookmark()}>
          <img src={bookMark} alt='bookMark' />
          <span> VIEW BOOKMARK</span>
        </Button>
        <div className='detail'>
          <div className='content-detail'>
            {articles?.webPublicationDate && (
              <span className='date'>
                {formatDate(articles?.webPublicationDate)}
              </span>
            )}
            <h1>{articles?.webTitle}</h1>
            <h3>{articles?.fields?.headline}</h3>
            <div className='body'>
              <hr />
              <div className='thumbnail-inside-detail'>
                {articles?.fields?.main && HtmlParser(articles?.fields?.main)}
              </div>
              {articles?.fields && HtmlParser(articles?.fields?.body)}
            </div>
          </div>
          <div className='thumbnail-outside-detail'>
            {articles?.fields?.main && HtmlParser(articles?.fields?.main)}
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default ArticlePage
