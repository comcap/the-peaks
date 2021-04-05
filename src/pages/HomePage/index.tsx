import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getList } from 'core/action/collection'
import {
  Layout,
  ContentHeader,
  ContentHomepage,
  ContentSearchPage,
} from 'components/layout'
import { Loader, ARC } from 'components/output'

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
          height: 100%;
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

const showFields = 'thumbnail,body'

const getSearchArticles = (key: string, order: string) => {
  return getList('/search', {
    q: key,
    section: 'news',
    'show-fields': 'all',
    'order-by': order,
  }).then((response) => response)
}

const getNewsArticles = (order: string) => {
  return getList('/search', {
    'page-size': 8,
    section: 'news',
    'show-fields': 'all',
    'order-by': order,
  }).then((response) => response)
}

const getSportsArticles = (order: string) => {
  return getList('/search', {
    section: 'sport',
    'show-fields': showFields,
    'order-by': order,
  }).then((response) => response)
}

const getCulturesArticles = (order: string) => {
  return getList('/search', {
    section: 'culture',
    'show-fields': showFields,
    'order-by': order,
  }).then((response) => response)
}

const getLifeAndStyleArticles = (order: string) => {
  return getList('/search', {
    section: 'lifeandstyle',
    'show-fields': showFields,
    'order-by': order,
  }).then((response) => response)
}

const HomePages: React.FC = () => {
  const [articles, setArticles] = useState<ARC.IResArticles[]>([])
  const [articlesSport, setSportArticles] = useState<ARC.IResArticles[]>([])
  const [articlesCultures, setCulturesArticles] = useState<ARC.IResArticles[]>(
    [],
  )
  const [articlesLifeAndStyle, setLifeAndStyleArticles] = useState<
    ARC.IResArticles[]
  >([])
  const [order, setOrder] = useState('newest')
  const [keyword, setKeyword] = useState('')
  const [isloading, setIsLoading] = useState(true)
  const [search, setSearch] = useState<ARC.IResArticles[] | null>(null)

  useEffect(() => {
    async function fetchAPI() {
      const news = await getNewsArticles(order)
      const sport = await getSportsArticles(order)
      const cultures = await getCulturesArticles(order)
      const LAS = await getLifeAndStyleArticles(order)

      setArticles(news)
      setSportArticles(sport)
      setCulturesArticles(cultures)
      setLifeAndStyleArticles(LAS)
      setIsLoading(false)
    }

    fetchAPI()
  }, [order])

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
          <>
            {search ? (
              <ContentSearchPage onFilter={onSelectFilter} articles={search} />
            ) : (
              <>
                <ContentHeader
                  title='Top stories'
                  filterValue={order}
                  onFilter={onSelectFilter}
                />
                <ContentHomepage
                  top={articles}
                  sport={articlesSport}
                  cultures={articlesCultures}
                  lifeAndStyle={articlesLifeAndStyle}
                />
              </>
            )}
          </>
        ) : (
          <Loader />
        )}
      </Content>
    </Layout>
  )
}

export default HomePages
