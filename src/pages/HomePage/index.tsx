import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { getList } from 'core/action/collection'
import { Layout, ContentHeader } from 'components/layout'
import { Article } from 'components/output'

const Content = styled.div`
  section {
    &.top,
    &.sec-fifth {
      @media screen and (min-width: 1024px) {
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr 1fr;
        grid-gap: 30px;

        .first {
          height: 512px;
        }

        .sec {
          min-height: 240px;
        }
      }
    }

    &.more {
      margin-top: 30px;
      @media screen and (min-width: 1024px) {
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 30px;
      }
    }

    @media screen and (min-width: 1024px) {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 30px;
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
    body: string
    bodyText: string
  }
  // blocks: {
  //   requestedBodyBlocks: {
  //     ['body:latest:1']: IBodyBlocks[]
  //   }
  // }
}

export type ICategory = 'sports' | 'cultures' | 'lifeAndStyle'

const onSelectFilter = (val: string) => {
  console.log(`val`, val)
}

const onSearch = (val: string) => {
  console.log(`val`, val)
}

const showFields = 'thumbnail,body'
const getNewsArticles = () => {
  return getList('/search', {
    'page-size': 8,
    section: 'news',
    'show-fields': 'all',
  }).then((response) => response)
}

const getSportsArticles = () => {
  return getList('/search', {
    section: 'sport',
    'show-fields': showFields,
  }).then((response) => response)
}

const getCulturesArticles = () => {
  return getList('/search', {
    section: 'culture',
    'show-fields': showFields,
  }).then((response) => response)
}

const getLifeAndStyleArticles = () => {
  return getList('/search', {
    section: 'lifeandstyle',
    'show-fields': showFields,
  }).then((response) => response)
}

const HomePages: React.FC = () => {
  const category: Array<ICategory> = ['sports', 'cultures', 'lifeAndStyle']

  const history = useHistory()
  const [articles, setArticles] = useState<IResArticles[]>([])
  const [articlesSport, setSportArticles] = useState<IResArticles[]>([])
  const [articlesCultures, setCulturesArticles] = useState<IResArticles[]>([])
  const [articlesLifeAndStyle, setLifeAndStyleArticles] = useState<
    IResArticles[]
  >([])

  useEffect(() => {
    async function fetchAPI() {
      const news = await getNewsArticles()
      const sport = await getSportsArticles()
      const cultures = await getCulturesArticles()
      const LAS = await getLifeAndStyleArticles()

      setArticles(news)
      setSportArticles(sport)
      setCulturesArticles(cultures)
      setLifeAndStyleArticles(LAS)
    }

    fetchAPI()
  }, [])

  const renderCategory = (key: ICategory) => {
    const obj = {
      sports: {
        title: 'Sports',
        articles: articlesSport,
      },
      cultures: {
        title: 'Cultures',
        articles: articlesCultures,
      },
      lifeAndStyle: {
        title: 'LifeAndStyle',
        articles: articlesLifeAndStyle,
      },
    }
    return obj[key]
  }

  return (
    <Layout onSearch={onSearch}>
      <Content>
        <ContentHeader title='Top stories' onFilter={onSelectFilter} />
        <section className='top'>
          {articles
            .filter((_, index) => index === 0)
            .map((article, index) => (
              <Article
                key={index}
                onClick={() => {
                  history.push({
                    pathname: '/article',
                    state: { id: article.id },
                  })
                }}
                className='first'
                title={article.webTitle}
                body={article.fields?.bodyText}
                thumbnail={article.fields?.thumbnail}
              />
            ))}

          <section className='sec-fifth'>
            {articles
              .filter(
                (_, index) =>
                  index === 1 || index === 2 || index === 3 || index === 4,
              )
              .map((article, index) => (
                <Article
                  key={index}
                  onClick={() => {
                    history.push({
                      pathname: '/article',
                      state: { id: article.id },
                    })
                  }}
                  className='sec'
                  title={article.webTitle}
                  thumbnail={article.fields?.thumbnail}
                />
              ))}
          </section>
        </section>
        <section className='more'>
          {articles
            .filter(
              (_, index) =>
                index !== 0 &&
                index !== 1 &&
                index !== 2 &&
                index !== 3 &&
                index !== 4,
            )
            .map((article, index) => {
              return (
                <Article
                  key={index}
                  onClick={() => {
                    history.push({
                      pathname: '/article',
                      state: { id: article.id },
                    })
                  }}
                  title={article.webTitle}
                  body={article.fields?.bodyText}
                  thumbnail={article.fields?.thumbnail}
                />
              )
            })}
        </section>
        {category.map((cate, index) => (
          <div key={index}>
            <ContentHeader
              title={renderCategory(cate).title}
              showBookMark={false}
              showFilter={false}
            />
            <section>
              {renderCategory(cate).articles.map((article, articleIndex) => (
                <Article
                  key={articleIndex}
                  onClick={() => {
                    history.push({
                      pathname: '/article',
                      state: { id: article.id },
                    })
                  }}
                  title={article.webTitle}
                  thumbnail={article.fields?.thumbnail}
                />
              ))}
            </section>
          </div>
        ))}
      </Content>
    </Layout>
  )
}

export default HomePages
