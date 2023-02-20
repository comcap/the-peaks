import debounce from 'lodash/debounce'
import moment from 'moment-timezone'
import { useEffect, useMemo, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from 'components/input'
import { ContentSearchPage, Layout } from 'components/layout'
import { Loader, SnackBar } from 'components/output'
import { IResArticles } from 'components/output/article/type'

import { getByID, getList } from 'core/action/collection'

import bookMark from 'assets/bookmarkon-icon@2x.svg'

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

const formatDate = (userDate: Date) => {
  const dateTime = moment(userDate)
    .tz('Europe/London')
    .format('ddd DD MMM YYYY HH.MM zz')
    .toLocaleUpperCase()
  return dateTime
}

const ArticlePage: React.FC = () => {
  const location = useLocation()
  // const [articles, setArticles] = useState<IResArticles>()
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false)

  const [order, setOrder] = useState('newest')
  const [keyword, setKeyword] = useState('')

  // const [showSnackBar, setShowSnackBar] = useState<string>(
  //   localStorage.getItem('bookmarks')
  // )
  // localStorage.setItem('bookmarks',)

  const fetchSearchArticles = (): Promise<IResArticles[]> => {
    if (keyword) {
      return getList('/search', {
        q: keyword,
        'page-size': 15,
        section: 'news',
        'show-fields': 'all',
        'order-by': order
      }).then((response) => response)
    } else {
      return Promise.resolve([])
    }
  }

  const fetchArticle = (): Promise<IResArticles> => {
    return getByID(`/${location.state.id}`, {
      'show-fields': `thumbnail,headline,body,main`,
      'show-elements': `image,audio`
    }).then((response) => response)
  }

  const { data: search, isLoading: isLoadingSearch } = useQuery(
    ['searchNew', keyword, order],
    fetchSearchArticles
  )

  const { data: articles, isLoading: isLoadingArticle } = useQuery('article', fetchArticle)

  const [observedEl, setObservedEl] = useState<any>(null)

  console.log('search', search)

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (items) => {
          if (items[0].isIntersecting) {
            console.log('first')
          }
        },
        { threshold: 1 }
      ),
    []
  )

  useEffect(() => {
    if (observedEl) {
      observer.observe(observedEl)
    }

    return () => {
      if (observedEl) {
        observer.unobserve(observedEl)
      }
    }
  }, [observedEl, observer])

  const onClickBookmark = () => {
    setShowSnackBar(true)
    setTimeout(() => {
      setShowSnackBar(false)
    }, 3000)
  }

  const onSearch = (val: string) => {
    setKeyword(val)
  }

  const onSelectFilter = (val: string) => {
    setOrder(val)
  }

  return (
    <Layout onSearch={debounce(onSearch, 1500)}>
      <Content>
        {!isLoadingSearch && !isLoadingArticle ? (
          search && search.length > 0 ? (
            <ContentSearchPage
              onFilter={onSelectFilter}
              articles={search}
              loadRef={setObservedEl}
            />
          ) : (
            <>
              <SnackBar message="the article has been save" show={showSnackBar} />
              <Button onClick={() => onClickBookmark()}>
                <>
                  <img src={bookMark} alt="bookMark" />
                  <span> VIEW BOOKMARK</span>
                </>
              </Button>
              <div className="detail">
                <div className="content-detail">
                  {articles?.webPublicationDate && (
                    <span className="date">{formatDate(articles?.webPublicationDate)}</span>
                  )}
                  <h1>{articles?.webTitle}</h1>
                  <h3>{articles?.fields?.headline}</h3>
                  <div className="body">
                    <>
                      <hr />
                      <div className="thumbnail-inside-detail">
                        <>{articles?.fields?.main && ReactHtmlParser(articles?.fields?.main)}</>
                      </div>
                      <>{articles?.fields && ReactHtmlParser(articles?.fields?.body)}</>
                    </>
                  </div>
                </div>
                <div className="thumbnail-outside-detail">
                  <>{articles?.fields?.main && ReactHtmlParser(articles?.fields?.main)}</>
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
