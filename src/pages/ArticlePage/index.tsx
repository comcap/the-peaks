import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import HtmlParser from 'react-html-parser'
import moment from 'moment'
import { getList } from 'core/action/collection'

import bookMark from 'assets/bookmarkon-icon@2x.svg'
import { Button } from 'components/input'
import { SnackBar, Loader, ARC } from 'components/output'
import { getByID } from 'core/action/collection'
import { Layout, ContentSearchPage } from 'components/layout'

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

export type ILocation = {
  id: string
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
  const [articles, setArticles] = useState<ARC.IResArticles>()
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false)

  const [order, setOrder] = useState('newest')
  const [keyword, setKeyword] = useState('')
  const [isloading, setIsLoading] = useState(true)
  const [search, setSearch] = useState<ARC.IResArticles[] | null>(null)

  // const [showSnackBar, setShowSnackBar] = useState<string>(
  //   localStorage.getItem('bookmarks')
  // )
  // localStorage.setItem('bookmarks',)

  const getSearchArticles = (key: string, order: string) => {
    return getList('/search', {
      q: key,
      section: 'news',
      'show-fields': 'all',
      'order-by': order,
    }).then((response) => response)
  }

  const onClickBookmark = () => {
    setShowSnackBar(true)
    setTimeout(() => {
      setShowSnackBar(false)
    }, 3000)
  }

  useEffect(() => {
    async function fetchAPI() {
      const news = await getArticle(location.state.id)

      setArticles(news)
      setIsLoading(false)
    }

    fetchAPI()
  }, [location])

  useEffect(() => {
    async function fetchAPI() {
      const news = await getSearchArticles(keyword, order)

      setSearch(news)
      setIsLoading(false)
    }
    if (keyword) {
      const timeOutId = setTimeout(() => fetchAPI(), 1000)
      return () => clearTimeout(timeOutId)
    } else {
      setSearch(null)
    }
  }, [keyword, order])

  const onSearch = (val: string) => {
    setIsLoading(true)
    setKeyword(val)
  }

  const onSelectFilter = (val: string) => {
    setIsLoading(true)
    setOrder(val)
  }

  return (
    <Layout onSearch={onSearch}>
      <Content>
        {!isloading ? (
          search ? (
            <ContentSearchPage onFilter={onSelectFilter} articles={search} />
          ) : (
            <>
              <SnackBar
                message='the article has been save'
                show={showSnackBar}
              />
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
                      {articles?.fields?.main &&
                        HtmlParser(articles?.fields?.main)}
                    </div>
                    {articles?.fields && HtmlParser(articles?.fields?.body)}
                  </div>
                </div>
                <div className='thumbnail-outside-detail'>
                  {articles?.fields?.main && HtmlParser(articles?.fields?.main)}
                </div>
              </div>
            </>
          )
        ) : (
          <Loader />
        )}
      </Content>
    </Layout>
  )
}

export default ArticlePage
