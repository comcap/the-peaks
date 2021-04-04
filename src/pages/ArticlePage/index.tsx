import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import HtmlParser from 'react-html-parser'
import moment from 'moment'

import bookMark from 'assets/bookmarkon-icon@2x.svg'
import { Button } from 'components/input'
import { getByID } from 'core/action/collection'
import { Layout, ContentHeader } from 'components/layout'
import { Article } from 'components/output'

const Content = styled.div`
  padding-top: 60px;

  .date {
  }
  .detail {
    margin-top: 20px;
    display: flex;

    .content-detail {
      width: 50%;

      .body {
        width: 100%;
        font-size: 14px;
        p {
          margin: 16px 0;
        }
      }
    }
    .thumbnail-detail {
      width: 50%;
      height: 300px;
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
  }
}

export type ILocation = {
  id: string
}

const onSelectFilter = (val: string) => {
  console.log(`val`, val)
}

const onSearch = (val: string) => {
  console.log(`val`, val)
}

const getArticle = (id: string) => {
  return getByID(`/${id}`, {
    'show-fields': `thumbnail,headline,body`,
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
        <Button>
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
              {articles?.fields && HtmlParser(articles?.fields?.body)}
            </div>
          </div>
          {articles?.fields?.thumbnail && (
            <img
              className='thumbnail-detail'
              src={articles?.fields?.thumbnail}
              alt='thumbnail'
            />
          )}
        </div>
      </Content>
    </Layout>
  )
}

export default ArticlePage
