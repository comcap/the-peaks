import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Article } from 'components/output'
import { ContentHeader } from 'components/layout'
import { IResArticles } from 'components/output/article/type'

export type ICategory = 'sports' | 'cultures' | 'lifeAndStyle'
export type IPropsHome = {
  top: IResArticles[]
  sport: IResArticles[]
  cultures: IResArticles[]
  lifeAndStyle: IResArticles[]
}

const category: Array<ICategory> = ['sports', 'cultures', 'lifeAndStyle']

const Content = styled.div`
  section {
    &.top,
    &.sec-fifth {
      @media screen and (min-width: 1024px) {
        .top-item:first-child {
          height: 100%;
          min-height: 0px;
        }

        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr 1fr;
        grid-gap: 30px;
        min-height: 240px;
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

  return (
    <Content>
      <section className="top">
        {top
          .filter((_, index) => index === 0)
          .map((article, index) => (
            <Article
              key={index}
              onClick={() => {
                navigate('/article', {
                  state: { id: article.id }
                })
              }}
              className="top-item"
              title={article.webTitle}
              body={article.fields?.bodyText}
              thumbnail={article.fields?.thumbnail}
            />
          ))}

        <section className="sec-fifth">
          {top
            .filter((_, index) => index === 1 || index === 2 || index === 3 || index === 4)
            .map((article, index) => (
              <Article
                key={index}
                onClick={() => {
                  navigate('/article', {
                    state: { id: article.id }
                  })
                }}
                className="sec"
                title={article.webTitle}
                thumbnail={article.fields?.thumbnail}
              />
            ))}
        </section>
      </section>
      <section className="more">
        {top
          .filter(
            (_, index) => index !== 0 && index !== 1 && index !== 2 && index !== 3 && index !== 4
          )
          .map((article, index) => {
            return (
              <Article
                key={index}
                onClick={() => {
                  navigate('/article', {
                    state: { id: article.id }
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
            ))}
          </section>
        </div>
      ))}
    </Content>
  )
}

export default ContentHome
