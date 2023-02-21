import debounce from 'lodash/debounce'
import { useEffect, useMemo, useState } from 'react'
import { useInfiniteQuery, useQueries } from 'react-query'

import { ContentHeader, ContentHomepage, ContentSearchPage, Layout } from 'components/layout'
import { Loader } from 'components/output'
import { IResponse } from 'components/output/article/type'

import { getList, getListInfinite } from 'core/action/collection'

const showFields = 'thumbnail,body'

const HomePages: React.FC = () => {
  const [order, setOrder] = useState('newest')
  const [keyword, setKeyword] = useState('')

  const fetchSearchArticles = ({ pageParam = 1 }): Promise<IResponse> => {
    if (keyword) {
      return getListInfinite('/search', {
        q: keyword,
        page: pageParam,
        'page-size': 15,
        'show-fields': 'all',
        'order-by': order
      }).then((response: IResponse) => response)
    } else {
      return Promise.reject()
    }
  }

  const fetchNewsArticles = () =>
    getList('/search', {
      'page-size': 8,
      section: 'news',
      'show-fields': 'all',
      'order-by': order
    }).then((response) => response)

  const fetchSportsArticles = () =>
    getList('/search', {
      section: 'sport',
      'show-fields': showFields,
      'order-by': order
    }).then((response) => response)

  const fetchCulturesArticles = () =>
    getList('/search', {
      section: 'culture',
      'show-fields': showFields,
      'order-by': order
    }).then((response) => response)

  const fetchLifeAndStyleArticles = () =>
    getList('/search', {
      section: 'lifeandstyle',
      'show-fields': showFields,
      'order-by': order
    }).then((response) => response)

  const [newsRes, sportRes, culturesRes, lifeAndStyleRes] = useQueries([
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
    }
  ])

  const {
    data: search,
    isLoading: isLoadingSearch,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['searchNew', keyword, order],
    queryFn: ({ pageParam = 1 }) => fetchSearchArticles({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.currentPage + 1,
    enabled: !!keyword
  })

  const [observedEl, setObservedEl] = useState<any>(null)

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (items) => {
          if (items[0].isIntersecting) {
            fetchNextPage()
          }
        },
        { threshold: 1 }
      ),
    [fetchNextPage]
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

  const onSearch = (val: string) => {
    setKeyword(val)
  }

  const onSelectFilter = (val: string) => {
    setOrder(val)
  }

  const renderContentSearch = () => {
    return (
      <>
        <ContentHeader onFilter={onSelectFilter} title="Search results" />
        {search?.pages.map((group) => (
          <ContentSearchPage
            onFilter={onSelectFilter}
            articles={group.results}
            loadRef={setObservedEl}
          />
        ))}
      </>
    )
  }

  return (
    <Layout onSearch={debounce(onSearch, 1500)}>
      <div>
        {!newsRes.isLoading &&
        !sportRes.isLoading &&
        !culturesRes.isLoading &&
        !lifeAndStyleRes.isLoading &&
        !isLoadingSearch ? (
          <>
            {search && search?.pages[0].results.length > 0 ? (
              renderContentSearch()
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
