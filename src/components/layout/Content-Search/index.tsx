import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Article } from 'components/output'
import { IResArticles } from 'components/output/article/type'
import { ContentHeader } from 'components/layout'

export type ICategory = 'sports' | 'cultures' | 'lifeAndStyle'
export type IPropsSearch = {
  articles: IResArticles[]
  onFilter: (val: string) => void
}

const ContentSearch: React.FC<IPropsSearch> = ({ articles, onFilter }) => {
  const navigate = useNavigate()

  return (
    <div>
      <ContentHeader onFilter={onFilter} title="Search results" />
      <section>
        {articles.length > 0 ? (
          articles.map((article, articleIndex) => (
            <Article
              key={articleIndex}
              onClick={() => {
                navigate('/article', {
                  state: { id: article.id }
                })
              }}
              title={article.webTitle}
              thumbnail={article.fields?.thumbnail}
            />
          ))
        ) : (
          <h3>No Content</h3>
        )}
      </section>
    </div>
  )
}

export default ContentSearch
