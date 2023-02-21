import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Article } from 'components/output'
import { IResArticles } from 'components/output/article/type'

export type ICategory = 'sports' | 'cultures' | 'lifeAndStyle'
export type IPropsSearch = {
  articles: IResArticles[]
  onFilter: (val: string) => void
  loadRef?: React.LegacyRef<HTMLParagraphElement> | undefined
}

const Content = styled.section`
  margin-top: 30px;
  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }
`

const ContentSearch: React.FC<IPropsSearch> = ({ articles, loadRef }) => {
  const navigate = useNavigate()

  return (
    <div>
      <Content>
        {articles.length > 0 ? (
          articles.map((article, articleIndex) => (
            <Article
              key={articleIndex}
              onClick={() => {
                navigate('/article', {
                  state: { id: article.id }
                })
              }}
              height={'350'}
              title={article.webTitle}
              section={article.sectionId}
              thumbnail={article.fields?.thumbnail}
            />
          ))
        ) : (
          <h3>No Content</h3>
        )}
        <div ref={loadRef} />
      </Content>
    </div>
  )
}

export default ContentSearch
