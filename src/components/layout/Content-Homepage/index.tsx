import React from 'react'
import { useHistory } from 'react-router-dom'
import { ARC } from 'components/output'
import { ContentHeader } from 'components/layout'

export type ICategory = 'sports' | 'cultures' | 'lifeAndStyle'
export type IPropsHome = {
  top: ARC.IResArticles[]
  sport: ARC.IResArticles[]
  cultures: ARC.IResArticles[]
  lifeAndStyle: ARC.IResArticles[]
}

const category: Array<ICategory> = ['sports', 'cultures', 'lifeAndStyle']

const ContentHome: React.FC<IPropsHome> = ({
  top,
  sport,
  cultures,
  lifeAndStyle,
}) => {
  const history = useHistory()

  const renderCategory = (key: ICategory) => {
    const obj = {
      sports: {
        title: 'Sports',
        articles: sport,
      },
      cultures: {
        title: 'Cultures',
        articles: cultures,
      },
      lifeAndStyle: {
        title: 'LifeAndStyle',
        articles: lifeAndStyle,
      },
    }
    return obj[key]
  }

  return (
    <div>
      <section className='top'>
        {top
          .filter((_, index) => index === 0)
          .map((article, index) => (
            <ARC.Article
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
          {top
            .filter(
              (_, index) =>
                index === 1 || index === 2 || index === 3 || index === 4,
            )
            .map((article, index) => (
              <ARC.Article
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
        {top
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
              <ARC.Article
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
            ))}
          </section>
        </div>
      ))}
    </div>
  )
}

export default ContentHome
