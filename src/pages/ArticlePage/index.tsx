import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import bookMark from 'assets/bookmarkon-icon@2x.svg'
import { Button } from 'components/input'
import { getByID } from 'core/action/collection'
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
          height: 312px;
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
    'show-fields': 'thumbnail',
  }).then((response) => response)
}

const ArticlePage: React.FC = () => {
  const location = useLocation<ILocation>()
  const [articles, setArticles] = useState<IResArticles[]>([])

  useEffect(() => {
    async function fetchAPI() {
      const news = await getArticle(location.state.id)
      setArticles(news)
    }

    fetchAPI()
  }, [])

  console.log(`articles`, articles)

  return (
    <Layout onSearch={onSearch}>
      <Content>
        <Button>
          <img src={bookMark} alt='bookMark' />
          <span> VIEW BOOKMARK</span>
        </Button>
        <section className='top'></section>
      </Content>
    </Layout>
  )
}

export default ArticlePage
