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
    display: flex;
    &.new {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 30px;
    }
    .top-left {
      flex: 1;
    }
    .top-right {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 30px;
    }

    &.article {
      @media screen and (min-width: 1024px) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 30px;
      }
    }

    margin-top: 30px;
    /* @media screen and (min-width: 1024px) {
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 30px;
      } */

    /* @media screen and (min-width: 1024px) {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 30px;
    } */
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
      <section className="new">
        <div className="top-left">
          {top
            .filter((_, index) => index === 0)
            .map((article, index) => (
              <Article
                className="h-100"
                key={index}
                onClick={() => {
                  navigate('/article', {
                    state: { id: article.id }
                  })
                }}
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
                onClick={() => {
                  navigate('/article', {
                    state: { id: article.id }
                  })
                }}
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
                onClick={() => {
                  navigate('/article', {
                    state: { id: article.id }
                  })
                }}
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
                onClick={() => {
                  navigate('/article', {
                    state: { id: article.id }
                  })
                }}
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
                onClick={() => {
                  navigate('/article', {
                    state: { id: article.id }
                  })
                }}
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
