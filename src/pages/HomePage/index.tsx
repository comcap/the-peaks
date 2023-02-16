import { useState } from 'react'
import { useQueries } from 'react-query'
import debounce from 'lodash/debounce'

import { getList } from 'core/action/collection'
import { Layout, ContentHeader, ContentHomepage, ContentSearchPage } from 'components/layout'
import { Loader } from 'components/output'

const showFields = 'thumbnail,body'

const HomePages: React.FC = () => {
  const [order, setOrder] = useState('newest')
  const [keyword, setKeyword] = useState('')

  const fetchSearchArticles = () => {
    if (keyword) {
      return getList('/search', {
        q: keyword,
        section: 'news',
        'show-fields': 'all',
        'order-by': order
      }).then((response) => response)
    }
  }

  const fetchNewsArticles = async () => {
    return await getList('/search', {
      'page-size': 8,
      section: 'news',
      'show-fields': 'all',
      'order-by': order
    }).then((response) => response)
  }

  const fetchSportsArticles = () => {
    return getList('/search', {
      section: 'sport',
      'show-fields': showFields,
      'order-by': order
    }).then((response) => response)
  }

  const fetchCulturesArticles = () => {
    return getList('/search', {
      section: 'culture',
      'show-fields': showFields,
      'order-by': order
    }).then((response) => response)
  }

  const fetchLifeAndStyleArticles = () => {
    return getList('/search', {
      section: 'lifeandstyle',
      'show-fields': showFields,
      'order-by': order
    }).then((response) => response)
  }

  const [newsRes, sportRes, culturesRes, lifeAndStyleRes, searchNewRes] = useQueries([
    {
      queryKey: ['articles', order],
      queryFn: fetchNewsArticles
    },
    {
      queryKey: ['sport', order],
      queryFn: fetchSportsArticles
    },
    {
      queryKey: ['culture', order],
      queryFn: fetchCulturesArticles
    },
    {
      queryKey: ['lifeandstyle', order],
      queryFn: fetchLifeAndStyleArticles
    },
    {
      queryKey: ['searchNew', keyword, order],
      queryFn: fetchSearchArticles
    }
  ])

  const onSearch = (val: string) => {
    setKeyword(val)
  }

  const onSelectFilter = (val: string) => {
    setOrder(val)
  }

  return (
    <Layout onSearch={debounce(onSearch, 500)}>
      <div>
        {!newsRes.isLoading &&
        !sportRes.isLoading &&
        !culturesRes.isLoading &&
        !lifeAndStyleRes.isLoading ? (
          <>
            {searchNewRes.data ? (
              <ContentSearchPage onFilter={onSelectFilter} articles={searchNewRes.data} />
            ) : (
              <>
                <ContentHeader title="Top stories" filterValue={order} onFilter={onSelectFilter} />
                <ContentHomepage
                  top={newsRes.data}
                  sport={sportRes.data}
                  cultures={culturesRes.data}
                  lifeAndStyle={lifeAndStyleRes.data}
                />
              </>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </Layout>
  )
}

export default HomePages
