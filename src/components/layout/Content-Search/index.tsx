import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Article } from 'components/output'
import { IResArticles } from 'components/output/article/type'

import { Content } from './contentSearch.style'

export type ICategory = 'sports' | 'cultures' | 'lifeAndStyle'
export type IPropsSearch = {
  articles: IResArticles[]
  onFilter: (val: string) => void
  loadRef?: React.LegacyRef<HTMLParagraphElement> | undefined
}

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
