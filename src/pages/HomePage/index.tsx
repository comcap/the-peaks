import { useEffect, useState } from 'react'
import styled from 'styled-components'

import LogoWhite from 'assets/Logo-white.png'
import { getList } from 'core/action/collection'
import { Layout, ContentHeader } from 'components/layout'

const Content = styled.div``

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

const onSelectFilter = (val: string) => {
  console.log(`val`, val)
}

const getArticles = () => {
  return getList('/search', {
    section: 'news',
    'show-fields': 'thumbnail',
  }).then((response) => response)
}

const HomePages: React.FC = () => {
  const [articles, setArticles] = useState<IResArticles[]>([])

  useEffect(() => {
    async function fetchAPI() {
      const res = await getArticles()
      setArticles(res)
    }

    fetchAPI()
  }, [])

  return (
    <Layout>
      <Content>
        <ContentHeader title='Top stories' onFilter={onSelectFilter} />
        <section>
          {articles.map((article) => {
            return (
              <div>
                <img
                  src={article.fields?.thumbnail || LogoWhite}
                  alt='thumbnail'
                />

                {article.webTitle}
              </div>
            )
          })}
        </section>
      </Content>
    </Layout>
  )
}

export default HomePages
