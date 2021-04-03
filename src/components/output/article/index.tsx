import styled from 'styled-components'
import LogoWhite from 'assets/Logo-white.png'

export type IArticle = {
  title: string
  thumbnail?: string
  className?: string
  onClick?: () => void
}

const ArticleStyle = styled.div`
  position: relative;
  margin-bottom: 30px;
  border-bottom: 2px solid var(--crimson);
  background-color: var(--darkslateblue);

  min-height: 160px;
  max-height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    min-height: 360px;
  }

  @media screen and (min-width: 1024px) {
    margin-bottom: 0px;
    min-height: 140px;
  }

  @media screen and (min-width: 1440px) {
    height: 240px;
  }

  .img-thumbnail {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
  .img-default {
    width: auto;
    height: 60px;
  }

  .content {
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: var(--darkslateblueOpacity);
    color: var(--white);
    p {
      padding: 14px;
    }
  }
`

const Article: React.FC<IArticle> = ({
  onClick,
  className,
  title,
  thumbnail,
}) => {
  return (
    <ArticleStyle onClick={onClick} className={className}>
      {thumbnail ? (
        <img className='img-thumbnail' src={thumbnail} alt='thumbnail' />
      ) : (
        <img className='img-default' src={LogoWhite} alt='thumbnail' />
      )}
      <div className='content'>
        <p>{title}</p>
      </div>
    </ArticleStyle>
  )
}

export default Article
