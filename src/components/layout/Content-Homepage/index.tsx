import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ContentHeader } from 'components/layout'
import { Article } from 'components/output'
import { IResArticles } from 'components/output/article/type'

import { Content } from './contentHomepage.style'

export type ICategory = 'sports' | 'cultures' | 'lifeAndStyle'
export type IPropsHome = {
  top: IResArticles[]
  sport: IResArticles[]
  cultures: IResArticles[]
  lifeAndStyle: IResArticles[]
}

const category: Array<ICategory> = ['sports', 'cultures', 'lifeAndStyle']

const ContentHome: React.FC<IPropsHome> = ({ top, sport, cultures, lifeAndStyle }) => {
  const navigate = useNavigate()

  const renderCategory = (key: ICategory) => {
    const obj = {
      sports: {
        title: 'Sports',
        articles: sport
      },
      cultures: {
        title: 'Cultures',
        articles: cultures
      },
      lifeAndStyle: {
        title: 'LifeAndStyle',
        articles: lifeAndStyle
      }
    }
    return obj[key]
  }

  const navigateToArticle = (id: string) =>
    navigate('/article', {
      state: { id }
    })

  return (
    <Content>
      <section className="new">
        <div className="top-left">
          {top
            .filter((_, index) => index === 0)
            .map((article, index) => (
              <Article
                className="h-100"
                key={index}
                onClick={() => navigateToArticle(article.id)}
                flex={'1'}
                title={article.webTitle}
                body={article.fields?.standfirst}
                section={article.sectionId}
                thumbnail={article.fields?.thumbnail}
              />
            ))}
        </div>
        <div className="top-right">
          {top
            .filter((_, index) => index === 1 || index === 2)
            .map((article, index) => (
              <Article
                key={index}
                onClick={() => navigateToArticle(article.id)}
                height="255"
                title={article.webTitle}
                thumbnail={article.fields?.thumbnail}
                section={article.sectionId}
                body={article.fields?.standfirst}
              />
            ))}
          {top
            .filter((_, index) => index === 3 || index === 4)
            .map((article, index) => (
              <Article
                key={index}
                onClick={() => navigateToArticle(article.id)}
                isOnlyTitle
                height="140"
                title={article.webTitle}
                section={article.sectionId}
                thumbnail={article.fields?.thumbnail}
              />
            ))}
        </div>
      </section>
      <section className="article">
        {top
          .filter(
            (_, index) => index !== 0 && index !== 1 && index !== 2 && index !== 3 && index !== 4
          )
          .map((article, index) => {
            return (
              <Article
                key={index}
                onClick={() => navigateToArticle(article.id)}
                height="350"
                title={article.webTitle}
                body={article.fields?.standfirst}
                section={article.sectionId}
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
          <section className="article">
            {renderCategory(cate).articles.map((article, articleIndex) => (
              <Article
                key={articleIndex}
                onClick={() => navigateToArticle(article.id)}
                height="350"
                title={article.webTitle}
                thumbnail={article.fields?.thumbnail}
                section={article.sectionId}
                body={article.fields?.standfirst}
              />
            ))}
          </section>
        </div>
      ))}
    </Content>
  )
}

export default ContentHome
