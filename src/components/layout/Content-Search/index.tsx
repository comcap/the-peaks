import React from 'react'
import { useHistory } from 'react-router-dom'
import { ARC } from 'components/output'
import { ContentHeader } from 'components/layout'

export type ICategory = 'sports' | 'cultures' | 'lifeAndStyle'
export type IPropsSearch = {
  articles: ARC.IResArticles[]
  onFilter: (val: string) => void
}

const ContentSearch: React.FC<IPropsSearch> = ({ articles, onFilter }) => {
  const history = useHistory()

  return (
    <div>
      <ContentHeader onFilter={onFilter} title='Search results' />
      <section>
        {articles.length > 0 ? (
          articles.map((article, articleIndex) => (
            <ARC.Article
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
          ))
        ) : (
          <h3>No Content</h3>
        )}
      </section>
    </div>
  )
}

export default ContentSearch
